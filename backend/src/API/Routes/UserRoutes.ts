import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import LoginController from "../Controllers/LoginController.js";
import { container } from "tsyringe";

// Middleware
import VerifyToken from "../Middlewares/VerifyToken.js";

const router = Router();

// Dependências
const userController = container.resolve(UserController);
const loginController = container.resolve(LoginController);

router.post("/register", userController.Register.bind(userController));
router.post("/login", loginController.Login.bind(loginController));
router.get(
  "/getuser",
  VerifyToken,
  userController.GetUserProfile.bind(userController)
);
router.patch(
  "/edit/:id",
  VerifyToken,
  userController.Update.bind(userController)
);

export default router;
