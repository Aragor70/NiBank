
import express, {Request, Response, Router, NextFunction} from 'express';


import ErrorResponse from "../utils/ErrorResponse";
import asyncHandler from "../middlewares/async";
import { pool } from '../config/db';

import moment from 'moment';
import SHA256 from 'crypto-js/sha256';


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

        if (!await this.isTsxCorrect(user, req?.body || null)) {
            return next(new ErrorResponse('Transaction is not correct.', 422)) 
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

        const tsxs: any[] = await this.getAllTsxs();
        
        const validTsxs: any[] = await this.getValidTsxs(tsxs);

        if (!validTsxs?.length) return false;
        
        const previousTransaction = await validTsxs[0];

        const previousHash = previousTransaction?.current_hash;
        const nonce = previousTransaction?.nonce + 1;

        const hash = await SHA256(((previousTransaction?.tsx_id) || 0).toString() + (previousHash || 'genesis') + (new Date().getTime() + user.user_id + to + amount + nonce).toString()).toString();
        
        const tsx = await pool.query(`INSERT INTO transactions (from_id, to_user_id, amount, previous_hash, current_hash, nonce, accounting_date, currency, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [ user.user_id, recipient.user_id, amount, previousHash || 'genesis', hash, nonce || 1, accounting_date || today, currency, description || '' ]);
        
        res.json({ tsx: tsx.rows[0], message: 'success'});

    })
    
    getTsxById = asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.params.tsx_id) {
            return next(new ErrorResponse('Transactions not found.', 404))
        }
        
        const tsxs: any[] = await this.getAllTsxs() || [];

        const tsx: any = await tsxs?.filter((element: any) => element?.tsx_id?.toString() === req?.params?.tsx_id?.toString())

        res.json({ tsx: tsx[0] || null });

    })

    getInitialWallets = async (user: any) => {

        let wallets: any[] = user?.wallets?.length ? user?.wallets?.map((element: any) => ({ balance: 0, currency: element, out: 0, in: 0 })) : []

        const isMatch = wallets.length ? await wallets?.filter((element: any) => element.currency === user.main_wallet)[0] : null;

        if (!isMatch && user?.main_wallet) {
            
            wallets.unshift({ balance: 0, currency: user?.main_wallet, out: 0, in: 0 })

        } else if (isMatch && user?.main_wallet) {
            wallets = wallets.reduce((acc: any, element: any) => {
                if (element.currency === user.main_wallet) {
                  return [element, ...acc];
                }
                return [...acc, element];
              }, []);
        }

        return wallets;

    };


    getValidTsxs = async (tsxs: any[]) => {

        const dataset: any[] = await tsxs.length ? tsxs?.slice()?.sort((a: any, b: any) => a?.tsx_id - b?.tsx_id) : [];

        if (dataset?.length) {

            return dataset?.filter((element: any, index: number) => (element.to_project_id !== undefined) && (element.previous_hash !== element.current_hash) && ( index ? element?.previous_hash?.toString() === dataset?.[index - 1]?.current_hash?.toString() : true ))

        } else {

            return [];

        }

        
    };

    getAllTsxs = async (ext: string = 'to') => {

        if (ext === 'from') {
            const transactions = await pool.query('SELECT * FROM transactions join accounts ON transactions.from_id = accounts.user_id WHERE transactions.from_id IS NOT NULL ORDER BY created_on DESC');
            const returns = await pool.query('SELECT * FROM transactions WHERE transactions.from_id IS NULL ORDER BY created_on DESC');
            const tsxs = (transactions.rows || []).concat(returns?.rows || [])?.sort((a: any, b: any) => b?.created_on - a?.created_on ) || [];
            return tsxs;
        } else {
            const transactions = await pool.query('SELECT * FROM transactions join accounts ON transactions.to_user_id = accounts.user_id WHERE transactions.to_user_id IS NOT NULL ORDER BY created_on DESC');
            const investments = await pool.query('SELECT * FROM transactions join projects ON transactions.to_project_id = projects.project_id WHERE transactions.to_project_id IS NOT NULL ORDER BY created_on DESC');
            const tsxs = (transactions.rows || []).concat(investments?.rows || [])?.sort((a: any, b: any) => b?.created_on - a?.created_on ) || [];
            return tsxs;
        }
        
    };

    getMyTsxs = async (user: any, tsxs: any[]) => {

        return user ? await tsxs.filter((element: any) => (element?.from_id?.toString() === user?.user_id?.toString()) || (element?.to_user_id?.toString() === user?.user_id?.toString())) : []
        
    };

    getMyWallets = async (user: any, tsxs: any[]) => {

        let wallets = await this.getInitialWallets(user);

        for (const transaction of tsxs) {
            
            if (user && transaction?.from_id?.toString() === user?.user_id?.toString()) {
                
                wallets = (!!wallets.length ? wallets.map((element: any) => element?.currency?.toString() === transaction?.currency?.toString() ? {...element, balance: element?.balance - transaction.amount, currency: transaction.currency, out: element.out + transaction.amount, in: (element.in || 0) } : element ) : [...wallets, { balance: 0 - transaction.amount, currency: transaction.currency, out: transaction.amount, in: 0}])

            }
            if (user && transaction?.to_user_id && transaction?.to_user_id?.toString() === user?.user_id?.toString()) {
                
                wallets = !!wallets.length ? wallets.map((element: any) => element?.currency?.toString() === transaction?.currency?.toString() ? {...element, balance: element?.balance + transaction.amount, in: element.in + transaction.amount, currency: transaction.currency, out: (element.out || 0) } : element ) : [...wallets, { balance: transaction.amount, currency: transaction.currency, out: 0, in: transaction.amount}]

            }
            
        }

        return wallets;
        
    };

    getWallet = async (wallets: any, tsx: any) => {

        return wallets?.filter((element: any) => element?.currency?.toString() === tsx?.currency?.toString())[0]
        
    };

    isTsxCorrect = async (user: any, tsx: any) => {

        const { amount, currency, description } = tsx;

        if ( !tsx || !amount || !currency || !description ) return false;
        
        const tsxs: any[] = await this.getAllTsxs() || [];

        if (!tsxs?.length) return false;

        const validTsxs: any[] = await this.getValidTsxs(tsxs);

        if (!validTsxs?.length) return false;

        const myTsxs: any[] = await this.getMyTsxs(user, validTsxs);
        
        /* if (!myTsxs?.length) return false; */

        const wallets: any[] = await this.getMyWallets(user, myTsxs);
        
        if (!wallets?.length) return false;

        const wallet: any = await this.getWallet(wallets, tsx);

        if (!wallet) return false;
        
        if (wallet?.balance < parseFloat(tsx?.amount)) return false;


        return true;
    }
    
}

export default TsxController;