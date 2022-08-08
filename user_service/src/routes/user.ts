import express from "express";
import controller from "../controllers/user";
import { authChanges, authorize, authRole } from "../middleware/authorization";
import Role from "../_helpers/role";
const router = express.Router();

// get User
router.get("/:id", authorize, controller.read);

// get All Users
router.get("/", authorize, authRole(Role.Admin), controller.readAll);

// delete User
router.delete("/:id", authorize, authChanges, controller.deleteUser);

// update User
router.put("/:id", authorize, authRole(Role.Admin), controller.updateUser);
export = router;
