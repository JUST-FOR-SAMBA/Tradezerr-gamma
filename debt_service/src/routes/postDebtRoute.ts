import { Request, Response, Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { uuidGenerator } from '../_helpers/generateUuid';

const router: Router = Router();
const prisma = new PrismaClient();

router.post('/debt', async (req: Request, res: Response) => {
    try {
        const debtUID =  uuidGenerator();
        const { businessId, businessName, dateOfIssuing, askedAmount, interestRate, repaymentPeriod }: Prisma.DebtUncheckedCreateInput = req.body;
        const newDebt = await prisma.debt.create({
            data: {
                businessId,
                businessName,
                dateOfIssuing,
                askedAmount,
                interestRate,
                repaymentPeriod,
                givenAmount: 0.0,
                debtUniqueIdentifier: debtUID,
                debtStatus: "ACTIVE",
                debtRepaymentStatus: "UNCOMPLETED"
            }
        })
        res.status(201).json({
            success: true,
            data: newDebt
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
})

export {router as postDebtRoute};

// {
//     "business": 1,
//     "businessName": "Derick-Wallet",
//     "dateOfIssuing": "08/27/2022",
//     "askedAmount": 2000.00,
//     "interestRate": 0.15,
//     "repaymentPeriod": 180.00
// }