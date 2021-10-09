import User from "../../models/User";

import express, {Request, Response, Router, NextFunction} from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ErrorResponse from "../../utils/ErrorResponse";
import asyncHandler from "../../middlewares/async";


const router: Router = express.Router();


router.post('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { email, password } = req.body;

    let user = await User.findOne(({ email }));

    if(!user){
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return next(new ErrorResponse('Invalid Credentials.', 422))
    }

    const payload = {
        user: {
            id: user.id
        }
    }
    const JWTSecretKey: any = process.env["jwtSecret"]
    return jwt.sign(payload, JWTSecretKey, { expiresIn: 360000 },
        (err, token) => {
            if(err) {
                return next(new ErrorResponse(err.message, 422))
            }
            res.json({ success: true, token }); 
            
    });


}))

export default router;