
import express, {Request, Response, Router, NextFunction} from 'express';

import ErrorResponse from "../utils/ErrorResponse";
import asyncHandler from "../middlewares/async";
import { pool } from '../config/db';

import moment from 'moment';
import SHA256 from 'crypto-js/sha256';
import TsxController from './TsxController';


const tsxController = new TsxController

class ProjectController {

    constructor() {    
        this.getProjects = this.getProjects.bind(this);
    }

    getProjects = asyncHandler(async (req: any, res: any, next: any) => {
        
        const projects = await pool.query('SELECT * FROM projects');
        
        res.json({ projects: projects.rows, message: 'Success' });

    })

    getProjectById = asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.params.project_id) {
            return next(new ErrorResponse('Project not found.', 404))
        }
        const projects = await pool.query(`SELECT * FROM projects where project_id = $1`, [ req.params.project_id ]);

        const tsxs: any[] = await tsxController.getAllTsxs('from');

        const validTsxs: any[] = await tsxController.getValidTsxs(tsxs);

        if (!validTsxs?.length) return false;

        const investors: any[] = await this.getProjectInvestors(projects.rows[0], validTsxs);
        
        const project = { ...projects.rows[0], investors }
        
        res.json({ project, message: 'Success', success: true });

    })
    
    createProject = asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
        const user = rows[0] || false;
        
                
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }      
        
        const { startdate, closedate, projectname, country, status, yieldpa, volumetotal, minimuminvestment, description, currency, typeofproperty, typeofinvestment, project, images, long_description } = req.body;
        
        if (status !== 'UNDER_CONSIDERATION') {
            return next(new ErrorResponse('Submit opportinity with a status under consideration.', 404))
        }
        if (volumetotal < 1000000) {
            return next(new ErrorResponse('Submit volume target to at least 1 000 000.', 404))
        }
        
        const projects = await pool.query(`INSERT INTO projects (owner_id, projectname, country, yieldpa, volumetotal, minimuminvestment, description, currency, status, typeofproperty, typeofinvestment, project, volumeinvested, images, listofinvestors, long_description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`, [ user.user_id, projectname, country, yieldpa, volumetotal, minimuminvestment, description, currency, status, typeofproperty, typeofinvestment, project, 0, images, [], long_description ]);
        res.json({ project: projects.rows[0], message: 'Success', success: true });
        
/* 
        const today = moment().format('YYYY-MM-DD');

        const a = moment(closedate);
        const b = moment(startdate || today);
        
        
        const term = a.diff(b, 'days') || undefined;
        console.log(term)


        const projects = await pool.query(`INSERT INTO projects (owner_id, startdate, closedate, projectname, country, yieldpa, volumetotal, minimuminvestment, description, currency, status, typeofproperty, typeofinvestment, project, term, volumeinvested, images, listofinvestors, long_description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`, [ user.user_id, startdate || today, closedate || null, projectname, country, yieldpa, volumetotal, minimuminvestment, description, currency, status, typeofproperty, typeofinvestment, project, term, 0, images, [], long_description ]);

        res.json({ project: projects.rows[0], message: 'Success', success: true }); */

    })
    
    invest = asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
        const user = rows[0] || false;
                
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }

        if (!await tsxController.isTsxCorrect(user, req?.body || null)) {
            return next(new ErrorResponse('Transaction is not correct.', 422)) 
        }
        if (!await this.isInvestmentCorrect(req.body || null)) {
            return next(new ErrorResponse('Transaction is not correct.', 422)) 
        }

        const { project_id } = req.params;
        const { amount, currency, accounting_date, description } = req.body;

        const projects = await pool.query(`SELECT * FROM projects WHERE project_id = $1`, [project_id]);
        const project = projects.rows[0] || false;
        
        const today = moment().format('YYYY-MM-DD');

        if (project.status !== "OPEN") {
            return next(new ErrorResponse('Project is not open.', 422))
        }
        if (project?.owner_id === user?.user_id) {
            return next(new ErrorResponse('You cannot participate in your project opportunity.', 422))
        }
        if (!amount || amount < project.minimuminvestment) {
            return next(new ErrorResponse('The amount is too little.', 422))
        }
        if (moment(today) > moment(project.closedate)) {
            return next(new ErrorResponse('Project is not open.', 422))
        }
        
        const tsxs: any[] = await tsxController.getAllTsxs();
        
        const validTsxs: any[] = await tsxController.getValidTsxs(tsxs);

        if (!validTsxs?.length) return false;
        
        const projectTsxs: any[] = await this.getProjectTsxs(project, validTsxs);

        const projectBalance: number = await this.getProjectBalance(project, projectTsxs);

        if (projectBalance >= project?.volumetotal) {
            await pool.query(`UPDATE projects SET status = $1 WHERE project_id = $2 RETURNING *`, [ 'FUNDED', project_id ]);
        }
        
        const previousTransaction = await validTsxs[0];

        const previousHash = previousTransaction?.current_hash;
        const nonce = previousTransaction?.nonce + 1;

        const hash = await SHA256(((previousTransaction?.tsx_id) || 0).toString() + (previousHash || 'genesis') + (new Date().getTime() + user?.user_id + project_id + amount + nonce).toString()).toString();
        
        const tsx = await pool.query(`INSERT INTO transactions (from_id, to_project_id, amount, previous_hash, current_hash, nonce, accounting_date, currency, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [ user.user_id, project.project_id, amount, previousHash || 'genesis', hash, nonce || 1, accounting_date || today, currency, description || '' ]);

        res.json({ tsx: tsx.rows[0], message: 'success', success: true });

    })
    
    update = asyncHandler( async (req: any, res: any, next: any) => {

        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
            return next(new ErrorResponse('Go to log on.', 422))
        }
        const token = req.headers.authorization.slice(req.headers.authorization.indexOf('Bearer') + 7)
        const { rows } = await pool.query(`SELECT * FROM accounts WHERE token = $1`, [token]);
        const user = rows[0] || false;
                
        if (!user) {
            return next(new ErrorResponse('User not found.', 404))
        }    
             
        
        const { startdate, closedate, projectname, country, status, yieldpa, volumetotal, minimuminvestment, description, currency, typeofproperty, typeofinvestment, project, images, long_description } = req.body;
        
        
        const { project_id } = req.params;
    
        const projectObject = await pool.query(`SELECT * FROM projects WHERE project_id = $1`, [project_id]);
        const currentProject = projectObject.rows[0] || false;
        
        const today = moment().format('YYYY-MM-DD');
    
        if (currentProject.status !== "UNDER_CONSIDERATION") {
            return next(new ErrorResponse('Project is not under consideration.', 422))
        }
        if (currentProject.status === "OPEN" && !closedate) {
            
            return next(new ErrorResponse('Choose a proper close date.', 422))
        }
        if (currentProject?.owner_id !== user?.user_id) {
            return next(new ErrorResponse('You cannot modify the project opportunity that you do not own.', 422))
        }
        if (currentProject.minimuminvestment < 0) {
    
            return next(new ErrorResponse('The minimum amount needs to be greater then 0.', 422))
        }
        if (moment(today) >= moment(currentProject.closedate)) {
            
            return next(new ErrorResponse('Choose a proper close date.', 422))
        }
        
        if (volumetotal < 1000000) {
            return next(new ErrorResponse('Submit volume target to at least 1 000 000.', 404))
        }
    
        
    
        const a = moment(closedate);
        const b = moment(startdate || today);
        
        
        const term = a.diff(b, 'days') || undefined;
    
    
    
        const projects = await pool.query(`UPDATE projects SET owner_id = $1, startdate = $2, closedate = $3, projectname = $4, country = $5, yieldpa = $6, volumetotal = $7, minimuminvestment = $8, description = $9, currency = $10, status = $11, typeofproperty = $12, typeofinvestment = $13, project = $14, term = $15, volumeinvested = $16, images = $17, listofinvestors = $18, long_description = $19 WHERE project_id = $20 RETURNING *`, [ user.user_id, startdate || today, closedate || null, projectname, country, yieldpa, volumetotal, minimuminvestment, description, currency, status, typeofproperty, typeofinvestment, project, term, 0, images, [], long_description, project_id ]);
    
        res.json({ project: projects.rows[0], message: 'Success', success: true });
    
    })
    
    deleteProjectById = asyncHandler( async (req: any, res: any, next: any) => {
    
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
    
        const projectObject = await pool.query(`SELECT * FROM projects WHERE project_id = $1`, [project_id]);
        const currentProject = projectObject.rows[0] || false;
        
        if (currentProject?.owner_id !== user?.user_id) {
            return next(new ErrorResponse('You cannot delete the project opportunity that you do not own.', 401))
        }
        if (currentProject?.status !== "UNDER_CONSIDERATION") {
            return next(new ErrorResponse('You cannot delete the project opportunity that was already started.', 422))
        }
    
    
        const projects = await pool.query(`DELETE FROM projects WHERE project_id = $1 RETURNING *`, [project_id]);
    
        res.json({ project: projects.rows[0], message: 'Success', success: true });
    
    })

    getProjectTsxs = async (project: any, tsxs: any[]) => {
        if (!tsxs?.length || !project) return []
        return tsxs?.filter((element: any) => element?.to_project_id?.toString() === project?.project_id?.toString())
        
    };

    getProjectBalance = async (project: any, tsxs: any[]) => {
        if (!tsxs?.length || !project?.volumetotal ) return 0

        return tsxs?.map((element: any)=> element?.amount || 0)?.reduce((a: number, b: number) => a + b);
        
    };
    
    getProjectInvestors = async (project: any, tsxs: any[]) => {
        if (!tsxs?.length ) return [];
        
        const usersTsxs: any[] = await tsxs?.filter((element: any) => element?.to_project_id?.toString() === project?.project_id?.toString() )?.map((element: any) => ({ user_id: element.user_id, name: element.name, email: element.email, amount: element.amount }));
        
        let users: any[] = [];

        /* Promise.all(
            for (let i = 0; i < usersTsxs.length; i++) {

                const found = await users.filter((element: any) => element.user_id === usersTsxs[i].user_id)
                if (found[0]) {
                    users = await users.map((element: any) => element.user_id === usersTsxs[i].user_id ? {...element, amount: element.amount + usersTsxs[i].amount} : element)
                } else {
                    users = [...users, usersTsxs[i]];
                }
            }
        ) */
            
        await (async function() {
            for await (let i of usersTsxs) {
                const found = await users.filter((element: any) => element.user_id === i.user_id)
                if (found[0]) {
                    users = await users.map((element: any) => element.user_id === i.user_id ? {...element, amount: element.amount + i.amount} : element)
                } else {
                    users = [...users, i];
                }
            }
         })();


        return users;
        
    };
    
    isInvestmentCorrect = async (tsx: any) => {

        const { amount, currency, description, project_id } = tsx;
        
        if ( !tsx || !amount || !currency || !description || !project_id  ) return false;

        
        const tsxs: any[] = await tsxController.getAllTsxs() || [];

        if (!tsxs?.length) return false;

        const validTsxs: any[] = await tsxController.getValidTsxs(tsxs);

        if (!validTsxs?.length) return false;

        const projectQuery = await pool.query(`SELECT * FROM projects where project_id = $1`, [ tsx.project_id ]);

        const project: any = await projectQuery?.rows[0];

        const projectTsxs: any[] = await this.getProjectTsxs(project, validTsxs);
        
        const volumeInvested: number = await this.getProjectBalance(project, projectTsxs);
        
        if ((volumeInvested + parseFloat(tsx?.amount)) > project?.volumetotal) return false;

        return true;
    }

/* 
    sendYield = async ( project: any ) => {

        // status if funded
        
        // from_project_id, owner_id

        // get project investors

        
        const tsxs: any[] = await tsxController.getAllTsxs();

        if (!tsxs?.length) return false;

        const validTsxs: any[] = await tsxController.getValidTsxs(tsxs);

        if (!validTsxs?.length) return false;

    }; */
    
}

export default ProjectController;