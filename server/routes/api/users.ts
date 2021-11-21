

import express, {Request, Response, Router, NextFunction} from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from "../../middlewares/async";
import ErrorResponse from "../../utils/ErrorResponse";
import { pool } from '../../config/db';

import { ec } from 'elliptic';

const ecGenerate = new ec('secp256k1');

const router: Router = express.Router();

//route get    api/auth
//description  test route
//access       private
router.get('/', asyncHandler( async (req: any, res: any, next: any) => {
    try {
        
        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }

        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);

        const user = rows[0] || false;

        if(!user){
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }
        
        const users = await pool.query('SELECT * FROM accounts');

        res.json(users.rows);

    }
    catch(err: any){
        console.error(err.message);
        res.status(500).send('Auth server error.')
    }
}));

router.post('/', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    
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
    
    user = await pool.query(
        `INSERT INTO accounts (name, email, password, avatar, public_key, private_key, account_type) VALUES($1, $2, $3, $4, $5, $6, $7)`, [userName, email, safePassword, avatar || '', publicKey, privateKey, accountType]
    );

    const payload = {
        user: {
            id: user.user_id
        }
    }
    const JWTSecretKey: any = process.env["jwtSecret"]
    return jwt.sign(payload, JWTSecretKey, { expiresIn: 360000 },
        async (err, token) => {
            if(err) {
                return next(new ErrorResponse(err.message, 422))
            }
            
            await pool.query(`UPDATE accounts SET token = $1 WHERE email = $2`, [token, email]);

            res.json({ success: true, token }); 
            
    });
       
}));


export default router;