import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";

const app = express();
app.set("trust proxy", true)

app.use(json());

app.get("/api/users", (req: Request, res: Response) => {
    res.status(200).send({"message": "Hello Kaka Derick"})
})
app.use((_, res) => {
    const error = new Error('Transaction Not found');

    res.status(404).json({
        message: error.message
    });
});

export {app}