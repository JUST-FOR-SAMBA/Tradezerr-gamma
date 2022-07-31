import express from 'express';
import { signupUser, loginUser } from '../controllers/user.auth';
const router = express.Router();
// REGISTER
router.post('/register', signupUser);
//  LOGIN
router.post('/login', loginUser);

export default router;
