import express from "express";
import {
  signupUser,
  loginUser,
  verifyUser,
  resendMail,
} from "../controllers/user.auth";
import { authorize, authRole } from "../middleware/authorization";
import Roles from "../_helpers/role";
const router = express.Router();
// REGISTER
router.post("/register", signupUser);

//  Admin create new user
router.post("/admin/register", authorize, authRole(Roles.Admin), signupUser);

//  LOGIN
router.post("/login", loginUser);

// VERIFIER
router.get("/verify/:token", verifyUser);

// RESEND VERIFICATION

router.post("/sendVerify", authorize, resendMail);

export default router;
