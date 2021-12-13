

import express, {Request, Response, Router, NextFunction} from 'express';


const router: Router = express.Router();

import TsxController from '../../controllers/TsxController';

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