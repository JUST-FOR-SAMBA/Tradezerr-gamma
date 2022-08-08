import express, { Application, Request, Response } from 'express';
import { getAllBusinessRouter } from './routes/getbusinessesRoute';
import { postBusinessRouter } from './routes/postBusinessRoute';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PATH = "/api/order";

app.get(PATH, (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to the Order Service!"})
})
// must have admin role
app.use(PATH, getAllBusinessRouter);
app.use(PATH, postBusinessRouter);

app.use((_, res) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});
export {app}