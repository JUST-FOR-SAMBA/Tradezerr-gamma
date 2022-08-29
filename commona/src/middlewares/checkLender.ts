import express, {Request, Response, NextFunction} from "express";

export const checkLender = async (req: Request, res: Response, next: NextFunction) => {
    // to check if user current user is lender by his/her role and check is he/she is verfied
        const user = req.currentUser;
        if(!user){
            return res.status(401).send({
                message: "No Current User"
            })
        }
        if(user?.role == "lender" && user?.status == true){
            return next();
        } else {
            return res.status(401).send({
                message: "Unauthorized User!"
            })
        }
}