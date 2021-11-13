

import express, {Request, Response, Router, NextFunction} from 'express';

import ErrorResponse from "../../utils/ErrorResponse";
import asyncHandler from "../../middlewares/async";
import { pool } from '../../config/db';

import moment from 'moment';
import SHA256 from 'crypto-js/sha256';

const router: Router = express.Router();


//route get    api/auth
//description  get all transactions
//access       public
router.get('/', asyncHandler( async (req: any, res: any, next: any) => {
    try {
        
        const transactions = await pool.query('SELECT * FROM transactions');
        
        res.json(transactions.rows);

    }
    catch(err: any){
        console.error(err.message);
        res.status(500).send('Auth server error.')
    }
}));

//route post   api/auth
//description  post new transaction
//access       private
router.post('/', asyncHandler( async (req: any, res: any, next: any) => {
    try {

        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
        const user = rows[0] || false;
        
        const { to, amount, accounting_date, currency } = req.body;
        console.log(accounting_date)
   
        const today = moment().format('YYYY-MM-DD');

        if (!amount) {
            return next(new ErrorResponse('Enter the amount.', 422)) 
        } else if (!to) {
            return next(new ErrorResponse('Enter the recipient.', 422)) 
        } else if (!currency) {
            return next(new ErrorResponse('Enter the amount currency.', 422)) 
        } else if (accounting_date && new Date(accounting_date).getTime() < new Date(today).getTime()) {
            return next(new ErrorResponse('Enter a date of today or later.', 422)) 
        }
        const matchRecipient = await pool.query(`SELECT * FROM accounts WHERE public_key = $1`, [to]);

        const recipient = matchRecipient.rows[0] || false;
        
        const previousTransaction = await pool.query(`SELECT * FROM transactions ORDER BY "tsx_id" DESC LIMIT 1`);

        const previousHash = previousTransaction?.rows[0]?.current_hash;
        const nonce = previousTransaction?.rows[0]?.nonce + 1;

        const hash = await SHA256((previousTransaction?.rows[0]?.tsx_id) || 0 + (previousHash || 'genesis') + new Date().getTime() + user.user_id + to + amount + nonce).toString();

        const transactions = await pool.query(`INSERT INTO transactions (from_id, to_user_id, amount, previous_hash, current_hash, nonce, accounting_date, currency) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [ user.user_id, recipient.user_id, amount, previousHash || 'genesis', hash, nonce || 1, accounting_date || today, currency ]);
        
        res.json(transactions);

    }
    catch(err: any){
        console.error(err.message);
        res.status(500).send('Auth server error.')
    }
}));





export default router;