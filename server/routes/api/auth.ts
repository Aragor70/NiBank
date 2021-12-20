

import express, {Request, Response, Router, NextFunction} from 'express';



const router: Router = express.Router();

import AuthController from '../../controllers/AuthController'


const authController: any = new AuthController;


//route get    api/auth
//description  get users
//access       private
router.get('/', authController.getUser);

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

//route get    api/auth
//description  sending recovery email
//access       private
router.post('/recovery', authController.setForgotCredentials);

//route get    api/auth
//description  update user credentials
//access       private
router.put('/recovery', authController.updateCredentials);

//route get    api/auth
//description  confirm recovery email
//access       private
router.post('/pre_recovery', authController.preRecovery);

//route get    api/auth
//description  verify email recovery
//access       private
router.post('/verify_secret', authController.verifySecret);

//route get    api/auth
//description  update email recovery
//access       private
router.put('/email_recovery', authController.updateEmail);

//route get    api/auth
//description  set income amount
//access       private
router.put('/income', authController.setIncome);



export default router;