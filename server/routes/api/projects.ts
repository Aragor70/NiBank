

import express, {Request, Response, Router, NextFunction} from 'express';

import ErrorResponse from "../../utils/ErrorResponse";
import asyncHandler from "../../middlewares/async";
import { pool } from '../../config/db';

import moment from 'moment';
import SHA256 from 'crypto-js/sha256';

const router: Router = express.Router();

//route get    api/auth
//description  get all projects
//access       public
router.get('/', asyncHandler( async (req: any, res: any, next: any) => {
        
        const projects = await pool.query('SELECT * FROM projects');
        
        res.json({ projects: projects.rows});

}));

//route get    api/auth
//description  get all projects
//access       public
router.get('/:project_id', asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.params.project_id) {
            return next(new ErrorResponse('Project not found.', 404))
        }
        const projects = await pool.query(`SELECT * FROM projects where project_id = $1`, [ req.params.project_id ]);
        
        res.json({ projects: projects.rows});

}));

//route post   api/auth
//description  post new project
//access       private
router.post('/', asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
        const user = rows[0] || false;
        
                
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }
        
        const { startdate, closedate, projectname, country, status, yieldpa, volumetotal, minimuminvestment, description, currency, typeofproperty, typeofinvestment, project, image } = req.body;
        
        console.log(startdate, closedate)
        const today = moment().format('YYYY-MM-DD');

        const a = moment(closedate);
        const b = moment(startdate || today);
        
        const images = [image];
        
        const term = a.diff(b, 'days') || undefined;
        console.log(term)
        const projects = await pool.query(`INSERT INTO projects (owner_id, startdate, closedate, projectname, country, yieldpa, volumetotal, minimuminvestment, description, currency, status, typeofproperty, typeofinvestment, project, term, volumeinvested, images, listofinvestors) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, [ user.user_id, startdate || today, closedate, projectname, country, yieldpa, volumetotal, minimuminvestment, description, currency, status, typeofproperty, typeofinvestment, project, term, 0, images, [] ]);

        res.json({ projects });

}));

//route post   api/auth
//description  invest on project by project_id
//access       private
router.post('/:project_id', asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
        const user = rows[0] || false;
                
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }

        const { project_id } = req.params;
        const { amount, currency, accounting_date, description } = req.body;

        const projects = await pool.query(`SELECT * FROM projects WHERE project_id = $1`, [project_id]);
        const project = projects.rows[0] || false;
        
        const today = moment().format('YYYY-MM-DD');

        if (project.status !== "OPEN") {
            console.log('status')
            return next(new ErrorResponse('Project is not open.', 422))
        }
        if (!amount || amount < project.minimuminvestment) {
            console.log('amount')
            return next(new ErrorResponse('The amount is too little.', 422))
        }
        if (moment(today) > moment(project.closedate)) {
            console.log('close date')
            return next(new ErrorResponse('Project is not open.', 422))
        }
        
        const previousTransaction = await pool.query(`SELECT * FROM transactions ORDER BY tsx_id DESC LIMIT 1`);

        const previousHash = previousTransaction?.rows[0]?.current_hash;
        const nonce = previousTransaction?.rows[0]?.nonce + 1;

        const hash = await SHA256(((previousTransaction?.rows[0]?.tsx_id) || 0).toString() + (previousHash || 'genesis') + (new Date().getTime() + user?.user_id + project_id + amount + nonce).toString()).toString();
        
        const tsx = await pool.query(`INSERT INTO transactions (from_id, to_project_id, amount, previous_hash, current_hash, nonce, accounting_date, currency, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [ user.user_id, project.project_id, amount, previousHash || 'genesis', hash, nonce || 1, accounting_date || today, currency, description || '' ]);

        res.json({ tsx: tsx.rows[0], message: 'success' });

}));

export default router;