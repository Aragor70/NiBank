

import express, {Request, Response, Router, NextFunction} from 'express';

import ErrorResponse from "../../utils/ErrorResponse";
import asyncHandler from "../../middlewares/async";
import { pool } from '../../config/db';

import moment from 'moment';
import SHA256 from 'crypto-js/sha256';

const router: Router = express.Router();



class TsxController {


    getTsxs = asyncHandler( async (req: any, res: any, next: any) => {
        
        //const transactions = await pool.query('SELECT * FROM transactions join accounts ON transactions.to_user_id = accounts.user_id join projects ON transactions.to_project_id = projects.project_id');
        const transactions = await pool.query('SELECT * FROM transactions join accounts ON transactions.to_user_id = accounts.user_id WHERE transactions.to_user_id IS NOT NULL ORDER BY created_on DESC');
        const investments = await pool.query('SELECT * FROM transactions join projects ON transactions.to_project_id = projects.project_id WHERE transactions.to_project_id IS NOT NULL ORDER BY created_on DESC');
        const output = (transactions.rows || []).concat(investments.rows || []).sort((a: any, b: any) => b?.created_on - a?.created_on ) || [];
        
        res.json(output);

    })
    
    createTransfer = asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
        const user = rows[0] || false;
        
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }


        const { to, amount, accounting_date, currency, description } = req.body;

   
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

        const isMatch = recipient?.wallets?.filter((element: any) => currency?.toString() === element?.toString())

        if (!recipient || !isMatch || !isMatch[0]) {
            return next(new ErrorResponse('Recipient does not allow this currency.', 422))
        }
        
        const previousTransaction = await pool.query(`SELECT * FROM transactions ORDER BY tsx_id DESC LIMIT 1`);

        const previousHash = previousTransaction?.rows[0]?.current_hash;
        const nonce = previousTransaction?.rows[0]?.nonce + 1;

        const hash = await SHA256(((previousTransaction?.rows[0]?.tsx_id) || 0).toString() + (previousHash || 'genesis') + (new Date().getTime() + user.user_id + to + amount + nonce).toString()).toString();
        
        const tsx = await pool.query(`INSERT INTO transactions (from_id, to_user_id, amount, previous_hash, current_hash, nonce, accounting_date, currency, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [ user.user_id, recipient.user_id, amount, previousHash || 'genesis', hash, nonce || 1, accounting_date || today, currency, description || '' ]);
        
        res.json({ tsx: tsx.rows[0], message: 'success'});

    })
    
    getTsxById = asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.params.tsx_id) {
            return next(new ErrorResponse('Transactions not found.', 404))
        }
        const investments = await pool.query(`SELECT * FROM transactions join projects ON transactions.to_project_id = projects.project_id WHERE tsx_id = $1 AND transactions.to_project_id IS NOT NULL`, [ req.params.tsx_id ]);
        const transfers = await pool.query(`SELECT * FROM transactions join accounts ON transactions.to_user_id = accounts.user_id WHERE tsx_id = $1 AND transactions.to_user_id IS NOT NULL`, [ req.params.tsx_id ]);
        
        const output = (transfers?.rows.length ? transfers?.rows : investments?.rows.length ? investments?.rows : [])


        res.json({ tsxs: output });

    })
    
}

const tsxController = new TsxController;

//route get    api/tsxs
//description  get all transactions
//access       public
router.get('/', tsxController.getTsxs);

//route post   api/tsxs
//description  post new transaction
//access       private
router.post('/', tsxController.createTransfer);

//route get    api/tsxs
//description  get tsx
//access       public
router.get('/:tsx_id', tsxController.getTsxById);



export default router;