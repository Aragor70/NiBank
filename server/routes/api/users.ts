

import express, {Request, Response, Router, NextFunction} from 'express';


const router: Router = express.Router();


import UserController from '../../controllers/UserController';

const userController = new UserController;


//route get    api/users
//description  get users
//access       private
router.get('/', userController.getUsers);

//route get    api/users
//description  register
//access       private
router.post('/', userController.register);


export default router;