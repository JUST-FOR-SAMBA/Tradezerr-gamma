import express, { Application, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import "express-async-errors";
import { getAllBusinessRouter } from './routes/getbusinessesRoute';
import { postBusinessRouter } from './routes/postBusinessRoute';
import { postDebtRoute } from './routes/postDebtRoute';
import { currentUser,checkAdmin } from "@tradezerr/common";
import { getAllDebtRouter } from './routes/getDebtRoute';

const app = express();

app.set('trust proxy', true);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}))

app.use(express.json());

const PATH = "/api/debts";

app.get(PATH, (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to the Debt Service!"})
})
// must have admin role
app.use(PATH, currentUser, checkAdmin, getAllBusinessRouter);
app.use(PATH, currentUser, checkAdmin, postBusinessRouter);
app.use(PATH, currentUser, checkAdmin, postDebtRoute);
app.use(PATH, currentUser, checkAdmin, getAllDebtRouter);

app.use((_, res) => {
    const error = new Error('Debt Page Not found');

    res.status(404).json({
        message: error.message
    });
});

export {app}