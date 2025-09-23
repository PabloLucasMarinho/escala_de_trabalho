import { Router } from "express";
import { container } from "tsyringe";
import VerifyToken from "../Middlewares/VerifyToken.js";
import UserController from "../Controllers/UserController.js";
import LoginController from "../Controllers/LoginController.js";

const router = Router();

// Dependências
const userController = container.resolve(UserController);
const loginController = container.resolve(LoginController);

router.post("/register", userController.Register.bind(userController));
router.post("/login", loginController.Login.bind(loginController));
router.get("/getuser", VerifyToken, userController.GetUserProfile.bind(userController));
router.put("/edit/:id", VerifyToken, userController.Update.bind(userController));
router.put("/change-password", VerifyToken, userController.ChangePassword.bind(userController));

export default router;
