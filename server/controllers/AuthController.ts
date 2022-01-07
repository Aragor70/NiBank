
import express, {Request, Response, Router, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ErrorResponse from "../utils/ErrorResponse";
import asyncHandler from "../middlewares/async";
import { pool } from '../config/db';
import SendingEmail from '../utils/SendingEmail';
import moment from 'moment';
import TsxController from './TsxController';
import { SHA256 } from 'crypto-js';
import CodeGenerate from '../utils/CodeGenerate';

const tsxController = new TsxController;
const sendingEmail = new SendingEmail;

class AuthController {


    getUser = asyncHandler( async (req: any, res: any, next: any) => {
        
        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }

        const token = await req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)

        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = await rows[0] || false;

        res.json(user);

    })

    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const { email, password } = req.body;
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE email = $1`, [email]);
        
        const user = await rows[0] || false;
        
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

        const today = moment().format('DD-MM-YYYY');

        const last_login = await user?.last_login ? moment(user?.last_login).format('DD-MM-YYYY') : null;

        if (today !== last_login && user?.main_wallet && user?.income) {
            await this.sendIncome(user, next);
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

    sendIncome = async (user: any, next: NextFunction, income: number = 0, accounting_date: any = null) => {
        
        if (!user) {
            return next(new ErrorResponse('Recipient not found.', 404))
        }
    
        const today = moment().format('YYYY-MM-DD');

        if (!user?.income && !income) {
            return next(new ErrorResponse('Enter the amount.', 422)) 
        }

        if (!user?.main_wallet) {
            return next(new ErrorResponse('Recipient does not allow this currency.', 422))
        }

        const description = "NiVest transfer";

        const tsxs: any[] = await tsxController.getAllTsxs();
        
        const validTsxs: any[] = await tsxController.getValidTsxs(tsxs);

        //if (!validTsxs?.length) return false;
        
        const previousTransaction = await validTsxs[0] || { current_hash: 'genesis', nonce: 0, tsx_id: 0 };

        const previousHash = previousTransaction?.current_hash;
        const nonce = previousTransaction?.nonce + 1;

        const hash = SHA256(((previousTransaction?.tsx_id) || 0).toString() + (previousHash || 'genesis') + (new Date().getTime() + user.user_id + user?.user_id + (income || user?.income) + nonce).toString()).toString();
        
        const tsx = await pool.query(`INSERT INTO transactions (from_id, to_user_id, amount, previous_hash, current_hash, nonce, accounting_date, currency, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [ 1, user.user_id, income || user?.income, previousHash || 'genesis', hash, nonce || 1, accounting_date || today, user.main_wallet, description || '' ]);
        
        return tsx?.rows[0];
    };

    setIncome = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
    
        const { income } = req.body;
    
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('Go to log on.', 422))
        }

        if (!user?.main_wallet) {
            return next(new ErrorResponse('You need to choose the main wallet.', 422))
        }
    
        if (typeof income === 'number') {
            const users = await pool.query(`UPDATE accounts SET income = $1 WHERE email = $2 RETURNING *`, [ income, user?.email ]);
            return res.json({ success: true, user: users?.rows[0] });
        } else {
            return next(new ErrorResponse('Amount is not a number.', 422))
        }
    
    })
    
    preLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const { email } = req.body;
    
        const { rows } = await pool.query(`SELECT email FROM accounts WHERE email = $1`, [email]);
        
        const user = await rows[0] || false;
        
        if(!user) {
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }
    
        res.json({ success: true, email }); 
           
    })
    
    preRegister = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const { email } = req.body;
    
        const { rows } = await pool.query(`SELECT email FROM accounts WHERE email = $1`, [email]);
        
        const user = await rows[0] || false;
        
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
            return next(new ErrorResponse('Email address is required.', 422))
        }
    
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        
        if (email && (email === user?.email)) {

            const users = await pool.query(`UPDATE accounts SET first_name = $1, last_name = $2, gender_title = $3, date_of_birth = $4, country = $5 WHERE email = $6 RETURNING *`, [ first_name, last_name, gender_title, date_of_birth, country, user?.email ]);
            
            return res.json({ success: true, user: users?.rows[0] });

        } else if (email && (email !== user?.email)) {
            
            const code: string = await CodeGenerate() || '';

            user.code = code || '';
            
            const users = await pool.query(`UPDATE accounts SET first_name = $1, last_name = $2, gender_title = $3, date_of_birth = $4, country = $5, email = $6, code = $7, approved = $8 WHERE email = $9 RETURNING *`, [ first_name, last_name, gender_title, date_of_birth, country, email, code, false, user?.email ]);

            user.email = await email;

            await sendingEmail.sendApproval(user)

            return res.json({ success: true, user: users?.rows[0] });

        } else {
            
            const users = await pool.query(`UPDATE accounts SET avatar = $1 WHERE email = $2  RETURNING *`, [ avatar, user?.email ]);
            
            return res.json({ success: true, user: users?.rows[0] });
            
        }
           
    })
    
    setMainWallet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
    
    
        const { main_wallet } = req.body;
        
        if ( !main_wallet ) {
            return next(new ErrorResponse('Currency is required.', 422))
        }
    
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = await rows[0] || false;
        
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
        
        if ( !wallet ) {
            return next(new ErrorResponse('Currency is required.', 422))
        }
    
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = await rows[0] || false;
        
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
    
        if (!code) {
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }
    
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
    
        const user = await rows[0] || false;
        
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
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
    
        const code: string = await CodeGenerate() || '';
    
        if (!code || !user.email) {
            return next(new ErrorResponse('Code generator issue.', 500))
        }
        user.code = code
    
        await sendingEmail.sendApproval(user)
    
        const users: any = await pool.query(`UPDATE accounts SET code = $1 WHERE email = $2 RETURNING *`, [code, user.email]);
    
        res.json({ success: true, user: users?.rows[0] });
           
    })

    preRecovery = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        
        const { email, code } = req.body;
        
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE email = $1 AND recovery = $2`, [email, code]);
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }
    
        res.json({ success: true });
           
    })

    verifySecret = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        
        const { secret, password } = req.body;
        
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE private_key = $1 `, [secret]);
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch){
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }

    
        res.json({ success: true });
           
    })
    
    setForgotCredentials = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        
        const { email } = req.body;
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE email = $1`, [email]);
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }

        const code: string = await CodeGenerate() || '';
    
        if (!code || !user.email) {
            return next(new ErrorResponse('Code generator issue.', 500))
        }
        user.recovery = code;
    
        await sendingEmail.sendPasswordRecovery(user);
    
        await pool.query(`UPDATE accounts SET recovery = $1 WHERE email = $2 RETURNING *`, [code, user.email]);
    
        res.json({ success: true });
           
    })

    
    updateCredentials = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const { email, code, password, passwordConfirmation } = req.body;
        
        if (password !== passwordConfirmation) {
            return next(new ErrorResponse('These passwords are not equal.', 422))
        }
    
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE email = $1 AND recovery = $2`, [email, code]);
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }

        // encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);
    
        const safePassword = await bcrypt.hash(password, salt);
    
        const users: any = await pool.query(`UPDATE accounts SET password = $1, recovery = $2 WHERE email = $3 RETURNING *`, [ safePassword, null, user.email ]);
     
        res.json({ success: true, user: users?.rows[0] || {} });
           
    })    

    updateEmail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const { secret, password, email, emailConfirmation } = req.body;
        
                
        if (email !== emailConfirmation) {
            return next(new ErrorResponse('These emails are not equal.', 422))
        }

        const { rows } = await pool.query(`SELECT * FROM accounts WHERE private_key = $1 `, [secret]);
    
        const user = await rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }

        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch){
            return next(new ErrorResponse('Invalid Credentials.', 422))
        }

        const code: string = await CodeGenerate() || '';

        user.code = code || '';
        
        const users: any = await pool.query(`UPDATE accounts SET email = $1, approved = $2 WHERE email = $3 RETURNING *`, [ email, false, user.email ]);

        user.email = await email;

        await sendingEmail.sendApproval(user)

        res.json({ success: true, user: users?.rows[0] });

    })


    
}

export default AuthController;