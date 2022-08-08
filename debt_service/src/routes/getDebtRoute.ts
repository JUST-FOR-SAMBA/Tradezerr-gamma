import express, { Application, Request, Response, Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';


const router: Router = express();
const prisma = new PrismaClient();
