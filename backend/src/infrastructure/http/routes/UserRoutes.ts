import { Router } from "express";
import UserController from "../controllers/UserControlle.js";

// Middleware
import verifyToken from "../helpers/verify-token.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch("/edit/:id", verifyToken, UserController.editUser);

export default router;
