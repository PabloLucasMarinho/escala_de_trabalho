import { Router } from "express";
import VerifyToken from "../Middlewares/VerifyToken.js";
import { container } from "tsyringe";
import EmployeeController from "../Controllers/EmployeeController.js";

const router = Router();

// Dependências
const employeeController = container.resolve(EmployeeController);

router.post("/register", VerifyToken, employeeController.Register.bind(employeeController));

export default router;
