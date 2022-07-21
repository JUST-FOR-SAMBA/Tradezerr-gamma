import express, { NextFunction, Request, Response } from "express";
import {logging} from './config/logging';
import { json } from "body-parser";

const app = express();
app.set("trust proxy", true)


// Logging Middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//     logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

//     res.on('finish', () => {
//         logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
//     });

//     next();
// });

//  Parse the Body {bodyParser is already included in Express}
app.use(json());

// API Access Policies
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//     if (req.method == 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }

//     next();
// });

app.get("/api/users", (req: Request, res: Response) => {
    res.status(200).send({"message": "Hello Kaka Derick"})
})
app.use((_, res) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

export {app}