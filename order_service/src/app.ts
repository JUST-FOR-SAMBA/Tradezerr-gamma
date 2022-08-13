import express, { Application, Request, Response } from 'express';
import { getOrderRouter } from './routes/getOrderRoute';


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PATH = "/api/order";

app.get(PATH, (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to the Order Service!"})
})
// must ask for lender role to get order by the appropriate lender
app.get(PATH,getOrderRouter);

app.use((_, res) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});
export {app}