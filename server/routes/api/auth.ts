

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
        
        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }

        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = rows[0] || false;
        console.log(user, 'Userload')
        
        res.json(user);

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
    
    if(!user) {
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }

    res.json({ success: true }); 
       
}))
router.post('/pre-register', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { email } = req.body;

    const { rows } = await pool.query(`SELECT email FROM accounts WHERE email = $1`, [email]);
    
    const user = rows[0] || false;
    
    if(user) {
        return next(new ErrorResponse('Account already exists.', 422))
    }

    res.json({ success: true });
       
}))



router.put('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        return next(new ErrorResponse('Go to log on.', 422))
    }


    const { first_name, last_name, gender_title, date_of_birth, country, email, avatar } = req.body;

    if ( !avatar && !email ) {
        console.log('error')
        return next(new ErrorResponse('Email address is required.', 422))
    }

    const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

    const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);

    const user = rows[0] || false;
    console.log(user)
    if (!user) {
        return next(new ErrorResponse('Go to log on.', 422))
    }

     if ( email ) {
        await pool.query(`UPDATE accounts SET first_name = $1, last_name = $2, gender_title = $3, date_of_birth = $4, country = $5, email = $6 WHERE email = $7`, [ first_name, last_name, gender_title, date_of_birth, country, email, user.email ]);
        
    } else {
        console.log(avatar)
        await pool.query(`UPDATE accounts SET avatar = $1 WHERE email = $2`, [ avatar, user.email ]);
        
    }


    res.json({ success: true });
       
}));

router.put('/main_wallet', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        return next(new ErrorResponse('Go to log on.', 422))
    }


    const { main_wallet } = req.body;
    console.log(main_wallet)
    if ( !main_wallet ) {
        return next(new ErrorResponse('Currency is required.', 422))
    }

    const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

    const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);

    const user = rows[0] || false;
    console.log(user)
    if (!user) {
        return next(new ErrorResponse('Go to log on.', 422))
    }

    const updates: any = await pool.query(`UPDATE accounts SET main_wallet = $1 WHERE email = $2 RETURNING *`, [ main_wallet, user.email ]);
 
    res.json({ success: true, user: updates?.rows[0] || {} });
       
}));
router.put('/wallets', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        return next(new ErrorResponse('Go to log on.', 422))
    }


    const { wallet } = req.body;
    console.log(wallet)
    if ( !wallet ) {
        return next(new ErrorResponse('Currency is required.', 422))
    }

    const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

    const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);

    const user = rows[0] || false;
    console.log(user)
    if (!user) {
        return next(new ErrorResponse('Go to log on.', 422))
    }

    const updates: any = await pool.query(`UPDATE accounts SET wallets = array_append(wallets, $1) WHERE email = $2 RETURNING *`, [ wallet, user.email ]);
 
    res.json({ success: true, user: updates?.rows[0] || {} });
       
}));

router.put('/approve', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        return next(new ErrorResponse('Go to log on.', 422))
    }
    

    const { code } = req.body;

    console.log(code)
    if (!code) {
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }
    console.log(code)

    const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

    const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);

    const user = rows[0] || false;
    console.log(user)
    if (!user) {
        return next(new ErrorResponse('Go to log on.', 422))
    }

    if (user?.code?.toString() !== code?.toString()) {
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }

    const users: any = await pool.query(`UPDATE accounts SET approved = true, code = '' WHERE email = $1 RETURNING *`, [user.email]);

    res.json({ success: true, user: users?.rows[0] });
       
}));




export default router;