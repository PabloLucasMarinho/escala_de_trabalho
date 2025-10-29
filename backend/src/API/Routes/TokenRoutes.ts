import { Router } from "express";
import { container } from "tsyringe";
import TokenController from "../Controllers/TokenController.js";
import VerifyToken from "../Middlewares/VerifyToken.js";

const router = Router();

const tokenController = container.resolve(TokenController);

router.post("/refresh-token", VerifyToken, tokenController.RefreshToken.bind(tokenController));

export default router;
