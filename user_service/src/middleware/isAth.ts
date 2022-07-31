import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

const SECRET: any = process.env.SECRET;

export const isAuth = (req: any, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json('access Denied !');
        }
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ message: 'No auth token found. Authorization denied.' });
        }

        const decodedToken: jwt.JwtPayload | any = jwt.verify(token, SECRET);

        if (!decodedToken?.id) {
            return res.status(401).send({ message: 'Token verification failed. Authorization denied.' });
        }

        req.user = decodedToken.username;
        req.userId = decodedToken.id;

        next();
    } catch (error) {
        res.status(500).json({
            error,
            message: 'unauthorized'
        });
    }
};
