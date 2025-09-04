import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.js";

// Middleware
import verifyToken from "../../middlewares/VerifyToken.js";

const router = Router();

router.post("/register", verifyToken, EmployeeController.register);

export default router;
