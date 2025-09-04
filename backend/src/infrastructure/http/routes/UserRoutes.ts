import { Router } from "express";
import UserController from "../controllers/UserController.js";

// Middleware
import VerifyToken from "../../middlewares/VerifyToken.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/getuser", VerifyToken, UserController.getUserByToken);
router.get("/:id", UserController.getUserById);
router.patch("/edit/:id", VerifyToken, UserController.editUser);

export default router;
