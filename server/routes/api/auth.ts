

import express, {Request, Response, Router, NextFunction} from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ErrorResponse from "../../utils/ErrorResponse";
import asyncHandler from "../../middlewares/async";
import { pool } from '../../config/db';
import SendingEmail from '../../utils/SendingEmail';

const router: Router = express.Router();



class AuthController {


    getUsers = asyncHandler( async (req: any, res: any, next: any) => {
        
        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }

        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = rows[0] || false;
        console.log(user, 'Userload')
        
        res.json(user);

    })

    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
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
    
    
    
    })
    
    preLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const { email } = req.body;
    
        const { rows } = await pool.query(`SELECT email FROM accounts WHERE email = $1`, [email]);
        
        const user = rows[0] || false;
        
        if(!user) {
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }
    
        res.json({ success: true }); 
           
    })
    
    preRegister = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const { email } = req.body;
    
        const { rows } = await pool.query(`SELECT email FROM accounts WHERE email = $1`, [email]);
        
        const user = rows[0] || false;
        
        if(user) {
            return next(new ErrorResponse('Account already exists.', 422))
        }
    
        res.json({ success: true });
           
    })
    
    update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
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
        
        if (!user) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
    
        if (email) {
            const users = await pool.query(`UPDATE accounts SET first_name = $1, last_name = $2, gender_title = $3, date_of_birth = $4, country = $5, email = $6 WHERE email = $7 RETURNING *`, [ first_name, last_name, gender_title, date_of_birth, country, email, user.email ]);
            return res.json({ success: true, user: users?.rows[0] });
        } else {
            const users = await pool.query(`UPDATE accounts SET avatar = $1 WHERE email = $2  RETURNING *`, [ avatar, user.email ]);
            return res.json({ success: true, user: users?.rows[0] });
        }
    
           
    })
    
    setMainWallet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
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
           
    })
    
    createWallet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
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
           
    })
    
    approve = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
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
           
    })
    
    reSendApproval = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
    
        const code: string = (Math.floor(100000 + Math.random() * 900000)).toString();
    
        if (!code || !user.email) {
            return next(new ErrorResponse('Code generator issue.', 500))
        }
        user.code = code
    
        await SendingEmail(user)
    
        const users: any = await pool.query(`UPDATE accounts SET code = $1 WHERE email = $2 RETURNING *`, [code, user.email]);
    
        res.json({ success: true, user: users?.rows[0] });
           
    })
    
}

const authController: any = new AuthController;

//route get    api/auth
//description  get users
//access       private
router.get('/', authController.getUsers);

//route get    api/auth
//description  login
//access       private
router.post('/', authController.login)

//route get    api/auth
//description  pre-login
//access       private
router.post('/pre-login', authController.preLogin)

//route get    api/auth
//description  pre-register
//access       private
router.post('/pre-register', authController.preRegister)

//route get    api/auth
//description  user update
//access       private
router.put('/', authController.update);

//route get    api/auth
//description  set main wallet
//access       private
router.put('/main_wallet', authController.setMainWallet);

//route get    api/auth
//description  create wallet
//access       private
router.put('/wallets', authController.createWallet);

//route get    api/auth
//description  approve account
//access       private
router.post('/approve', authController.approve);

//route get    api/auth
//description  re-send code approval
//access       private
router.put('/approve', authController.reSendApproval);



export default router;