import { Router } from "express";
import VerifyToken from "../../middlewares/VerifyToken.js";
import WorkplaceController from "../controllers/WorkplaceController.js";

const router = Router();

router.post("/register", VerifyToken, WorkplaceController.register);

export default router;
