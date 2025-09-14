import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import LoginController from "../Controllers/LoginController.js";
import { container } from "tsyringe";

// Middleware
import VerifyToken from "../Middlewares/VerifyToken.js";
import { LoggedUserHandler } from "../Middlewares/LoggedUserHandler.js";

const router = Router();

// Dependências
const userController = container.resolve(UserController);

router.post("/register", userController.Register.bind(userController));
router.post("/login", LoginController.Login);
router.get(
  "/getuserbyprofile",
  VerifyToken,
  LoggedUserHandler,
  userController.GetUserProfile.bind(userController)
);
// router.get("/:id", UserController.getUserById);
// router.patch("/edit/:id", VerifyToken, UserController.editUser);

export default router;
