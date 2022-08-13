import express from "express";
import {
  signupUser,
  loginUser,
  verifyUser,
  resendMail,
} from "../controllers/user.auth";
import { authChanges, authorize } from "../middleware/authorization";
const router = express.Router();
// REGISTER
router.post("/register", signupUser);

//  Admin create new user
router.post("/admin/register", authorize, authChanges, signupUser);

//  LOGIN
router.post("/login", loginUser);

// VERIFIER
router.get("/verify/:token", verifyUser);

// RESEND VERIFICATION

router.post("/sendVerify", authorize, resendMail);

export default router;
