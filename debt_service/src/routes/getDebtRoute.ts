import express, { Application, Request, Response, Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';


const router: Router = express();
const prisma = new PrismaClient();
router.get("/debts",async (req: Request, res: Response) => {
    try {
        const allDebts = await prisma.debt.findMany()
        res.status(200).json({
            success: true,
            data: allDebts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }

})

export {router as getAllDebtRouter};