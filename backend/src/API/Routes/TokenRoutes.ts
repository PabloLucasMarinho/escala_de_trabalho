import { Router } from "express";
import { container } from "tsyringe";
import TokenController from "../Controllers/TokenController.js";

const router = Router();

const tokenController = container.resolve(TokenController);

router.post("/refresh-token", tokenController.RefreshToken.bind(tokenController));

export default router;
