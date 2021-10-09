require('dotenv').config({ path: './config/config.env' })

import express, {Request, Response, Application} from 'express';
import connect from './config/db';
import errorHandler from './middlewares/error';

import authRouter from './routes/api/auth'
import usersRouter from './routes/api/users'

const app:Application = express();

// connect mongodb
connect();

// allow to use json format
app.use(express.json(<any>{ extended: false }))

// show response if server works correctly
app.get('/', (req: Request, res: Response) => res.send('Server is Running...'))

// use login and register API routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);


// use error handler created at ./middlewares/error
app.use(errorHandler)

const PORT:number | string = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`));

process.on('unhandledRejection', (err: any, _promise: any) => {
    console.log(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})