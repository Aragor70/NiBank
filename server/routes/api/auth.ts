

import express, {Request, Response, Router, NextFunction} from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ErrorResponse from "../../utils/ErrorResponse";
import asyncHandler from "../../middlewares/async";
import { pool } from '../../config/db';

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
        console.log(user, 'Userload')
        
        res.json(user);

    }
    catch(err: any){
        console.error(err.message);
        res.status(500).send('Auth server error.')
    }
}));

router.post('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { email, password } = req.body;

    const { rows } = await pool.query(`SELECT * FROM accounts WHERE email = $1`, [email]);
    
    const user = rows[0] || false;
    
    if(!user){
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }

    const payload = {
        user: {
            id: user.user_id
        }
    }
    
    await pool.query(`UPDATE accounts SET last_login = now() WHERE email = $1`, [email]);

    const JWTSecretKey: any = process.env["jwtSecret"]
    return jwt.sign(payload, JWTSecretKey, { expiresIn: 360000 },
        async (err, token) => {
            if(err) {
                return next(new ErrorResponse(err.message, 422))
            }

            await pool.query(`UPDATE accounts SET token = $1 WHERE email = $2`, [token, email]);

            res.json({ success: true, token }); 
            
    });



}))

router.post('/pre-login', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { email } = req.body;

    const { rows } = await pool.query(`SELECT email FROM accounts WHERE email = $1`, [email]);
    
    const user = rows[0] || false;
    
    if(!user){
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }

    res.json({ success: true }); 
       
}))

export default router;