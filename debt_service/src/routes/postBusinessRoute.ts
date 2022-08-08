import express, { Application, Request, Response, Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';


const router: Router = express();
const prisma = new PrismaClient();

router.post("/business",async (req: Request, res: Response) => {
    try {
        const {businessName, businessUniqueIdentifier, businessRegNumber, businessTaxNumber, description, businessOwnerName, businessOwnerId} : Prisma.BusinessCreateInput = req.body;
        const newBusiness = await prisma.business.create({
            data: {
                businessName,
                businessUniqueIdentifier,
                businessRegNumber,
                businessTaxNumber,
                description,
                businessOwnerName,
                businessOwnerId
            }
        })
        res.status(201).json({
            success: true,
            data: newBusiness
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
})

export {router as postBusinessRouter}


// {
//     "businessName": "Derick-Wallet",
//     "businessUniqueIdentifier": "TRADEZERR-B-001-IT",
//     "businessRegNumber": "UG-SMB-001",
//     "businessTaxNumber": "UG-REV-AUTH/Derick-Wallet/UG-SMB-001",
//     "description": "Derick Wallet enables easy payment for oil dealer",
//     "businessOwnerName": "Derick Zihalirwa",
//     "businessOwnerId": "TRADEZERR-B-OWNER-001"
// }