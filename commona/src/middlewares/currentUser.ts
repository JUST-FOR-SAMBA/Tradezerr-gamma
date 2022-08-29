import express, {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string,
    username: string,
    role: string
    status: boolean
}
declare global {
    namespace Express {
      interface Request {
        currentUser?: UserPayload;
      }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.session?.jwt) {
      return next();
    }
    try {
      const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_SECRET!,
      ) as UserPayload;
      req.currentUser = payload;
    } catch (error) {}
    next();
  };
