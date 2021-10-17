require('dotenv').config({ path: './config/config.env' })

import express, {Request, Response, Application} from 'express';
import errorHandler from './middlewares/error';

import authRouter from './routes/api/auth'
import usersRouter from './routes/api/users'
import cors from 'cors';

const app:Application = express();

app.use(cors());

app.use(express.json(<any>{ extended: false }))

app.get('/', (req: Request, res: Response) => res.send('Server is Running...'))

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler)

const PORT:number | string = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`));

process.on('unhandledRejection', (err: any, _promise: any) => {
    console.log(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})