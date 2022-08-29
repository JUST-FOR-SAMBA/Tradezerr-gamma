import express, {Request, Response, NextFunction} from "express";

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // to check if user current user is admin by his/her role and check is he/she is verfied reall
        const user = req.currentUser;
        if(!user){
            return res.status(401).send({
                message: "No Current User"
            })
        }
        if(user?.role == "admin" && user?.status == true){
            return next();
        } else {
            return res.status(401).send({
                message: "Unauthorized User!"
            })
        }
}