

import express, {Request, Response, Router, NextFunction} from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from "../../middlewares/async";
import ErrorResponse from "../../utils/ErrorResponse";
import { pool } from '../../config/db';

const router: Router = express.Router();


router.post('/', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    
    const { name, email, password } = req.body;

    const { rows } = await pool.query(`SELECT * FROM accounts WHERE email = $1`, [email]);

    let user = rows[0] || false;

    console.log(user)
    if (user) {
        return next(new ErrorResponse('User already exists.', 422))
    } else if (!email || !email.includes('@')) {
        return next(new ErrorResponse('Enter @ address.', 422))
    }

    const avatar = gravatar.url(email, {
        s: '200', r: 'pg', d: 'mm'
    //  size, rating, default image
    });

    const userName = name || email.slice(0, email.indexOf('@'));

    // encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);

    const safePassword = await bcrypt.hash(password, salt);

    user = await pool.query(
        `INSERT INTO accounts (name, email, password, avatar) VALUES($1, $2, $3, $4)`, [userName, email, safePassword, '']
    );

    const payload = {
        user: {
            id: user.user_id
        }
    }
    const JWTSecretKey: any = process.env["jwtSecret"]
    return jwt.sign(payload, JWTSecretKey, { expiresIn: 360000 },
        (err, token) => {
            if(err) {
                return next(new ErrorResponse(err.message, 422))
            }
            res.json({ success: true, token }); 
            
    });
       
}));


export default router;