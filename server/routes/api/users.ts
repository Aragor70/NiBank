import User from "../../models/User";

import express, {Request, Response, Router, NextFunction} from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from "../../middlewares/async";
import ErrorResponse from "../../utils/ErrorResponse";

const router: Router = express.Router();


router.post('/', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    
    const { name, email, password } = req.body;

    let user: any = await User.findOne(({ email }))

    if (user) {
        return next(new ErrorResponse('User already exists.', 422))
    } else if (!email || !email.includes('@')) {
        return next(new ErrorResponse('Enter @ address.', 422))
    }

    const avatar = gravatar.url(email, {
        s: '200', r: 'pg', d: 'mm'
    //  size, rating, default image
    });

    const userName = name || email.slice(0, email.indexOf('@'));

    user = new User({
        name: userName,
        email,
        avatar,
        password
    });

    // encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
       
}));


export default router;