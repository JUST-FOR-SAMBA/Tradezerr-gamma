import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

router.get("/get-one/:orderId",async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        const order = await prisma.order.findFirst({where: {
            id: orderId
        }})
        if(!order){
            res.status(404).json({
                message: `Order ${orderId} could not be found!`
            });
            return;
        }
        res.status(200).json({
            message: `Order ${orderId} found!`,
            data: order
        });
    } catch (error) {
        console.error(error);
    }
   
});

export {router as getOrderRouter};