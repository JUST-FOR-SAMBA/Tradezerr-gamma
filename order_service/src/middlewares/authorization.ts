import "dotenv/config";
import jwt, { decode } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { canMakeChange } from "../_permission/canMakeChange";

const SECRET: any = process.env.SECRET;

export const authorize = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json("access Denied !");
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "No auth token found. Authorization denied." });
    }

    const decodedToken: jwt.JwtPayload | any = jwt.verify(token, SECRET);

    if (!decodedToken?.id) {
      return res
        .status(401)
        .send({ message: "Token verification failed. Authorization denied." });
    }

    req.user = decodedToken.username;
    req.userId = decodedToken.id;

    next();
  } catch (error) {
    res.status(500).json({
      error,
      message: "unauthorized",
    });
  }
};

export const authRole = (userRole: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "No auth token found. Authorization denied." });
    }

    const decodedToken: jwt.JwtPayload | any = jwt.verify(token, SECRET);

    if (decodedToken.username !== "razac") {
      return res.status(401).json("access Denied !");
    }
    next();
  };
};

export const authChanges = (req: any, res: Response, next: NextFunction) => {
  const { role } = req.body;
  if (!canMakeChange(role)) {
    return res.status(401).json("access Denied !");
  }
  next();
};