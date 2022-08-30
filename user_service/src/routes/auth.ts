import express, {Request, Response} from "express";
import {
  signupUser,
  loginUser,
  verifyUser,
  resendMail,
  signupAdmin,
} from "../controllers/user.auth";
import { authChanges, authorize } from "../middleware/authorization";
import {currentUser, checkAdmin, checkLender} from "@tradezerr/common";
const router = express.Router();
// REGISTER
router.post("/register", signupUser);

//  Admin create new user
router.post("/admin/register", signupAdmin);

//  LOGIN
router.post("/login", loginUser);

// VERIFIER
router.get("/verify/:token", verifyUser);

//VERIFY USER LENDER
// /verify-user?userId="dwjddwdoiwjdwijdopwdw"
router.get('/verify-user', currentUser, checkAdmin, verifyUser)

// CHECK CURRENT USER
router.get('/current-user', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
},)

// CHECK LENDER 
router.get('/check-lender', currentUser, checkLender, (req: Request, res: Response) => {
  res.send({ 
    userRole: req.currentUser?.role || null,
    userStatus: req.currentUser?.status
   });
},)

// // CHECK ADMIN 
// router.get('/check-admin', currentUser, checkAdmin, (req: Request, res: Response) => {
//   res.send({ 
//     userRole: req.currentUser?.role || null,
//     userStatus: req.currentUser?.status
//    });
// },)
// // RESEND VERIFICATION

router.post("/sendVerify", authorize, resendMail);

export default router;
