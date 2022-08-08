import express, { Application, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';


const router: Router = express();
const prisma = new PrismaClient();

router.get("/business",async (req: Request, res: Response) => {
    try {
        const allBusinesses = await prisma.business.findMany()
        res.status(200).json({
            success: true,
            data: allBusinesses
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }

})

export {router as getAllBusinessRouter};

