import { Router } from "express";
import UserController from "../controllers/UserControlle.js";

const router = Router();

router.post("/register", UserController.register);

export default router;
