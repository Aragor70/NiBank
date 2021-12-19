

import express, {Request, Response, Router, NextFunction} from 'express';

import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from "../middlewares/async";
import ErrorResponse from "../utils/ErrorResponse";
import { pool } from '../config/db';

import { ec } from 'elliptic';
import SendingEmail from '../utils/SendingEmail';
import CodeGenerate from '../utils/CodeGenerate';

const ecGenerate = new ec('secp256k1');
const sendingEmail = new SendingEmail;

class UserController {


    getUsers = asyncHandler( async (req: any, res: any, next: any) => {
        

        if(req?.headers?.authorization && req?.headers?.authorization?.includes('Bearer')) {
            const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
    
            const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
            const user = rows[0] || false;
    
            if(user){
    
                const users = await pool.query('SELECT * FROM accounts');
    
                res.json(users.rows);
    
            } else {
    
                const users = await pool.query('SELECT user_id FROM accounts');
            
                res.json(users.rows);
            }
            
        } else {
    
            const users = await pool.query('SELECT user_id FROM accounts');
            
            res.json(users.rows);
    
        }
    
    })
    
    register = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    
        const { name, email, password, accountType } = req.body;
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE email = $1`, [email]);
    
        let user = rows[0] || false;
    
        console.log(user)
        if (user) {
            return next(new ErrorResponse('User already exists.', 422))
        } else if (!email || !email.includes('@')) {
            return next(new ErrorResponse('Enter @ address.', 422))
        }
    
        let avatar = gravatar.url(email, {
            s: '200', r: 'pg', d: 'mm'
        });
    
        if (avatar && avatar.toString() && !avatar.toString().includes('https')) {
            avatar = 'https:' + avatar.toString()
        }
    
        const userName = name || email.slice(0, email.indexOf('@'));
    
        // encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);
    
        const safePassword = await bcrypt.hash(password, salt);
    
        const key = ecGenerate.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');
        
        const users = await pool.query(
            `INSERT INTO accounts (name, email, password, avatar, public_key, private_key, account_type, code) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [userName, email, safePassword, avatar || '', publicKey, privateKey, accountType, '']
        );
        
        user = users?.rows[0];
    
    
        const payload = {
            user: {
                id: user.user_id
            }
        }
    
    
        const JWTSecretKey: any = process.env["jwtSecret"];
    
        return jwt.sign(payload, JWTSecretKey, { expiresIn: 360000 },
            async (err, token) => {
                if(err) {
                    return next(new ErrorResponse(err.message, 422))
                }
    
                const code: string = await CodeGenerate() || '';

                user.code = code || '';
    
                await sendingEmail.sendApproval(user)
                
                await pool.query(`UPDATE accounts SET token = $1, code = $2 WHERE email = $3`, [token, code, email]);
    
                res.json({ success: true, token }); 
                
        });
           
    })
    
}

export default UserController;