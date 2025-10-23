import { Router } from "express";
import VerifyToken from "../Middlewares/VerifyToken.js";
import { container } from "tsyringe";
import EmployeeController from "../Controllers/EmployeeController.js";

const router = Router();

// Dependências
const employeeController = container.resolve(EmployeeController);

router.post("/register", VerifyToken, employeeController.Register.bind(employeeController));
router.get("/getall", VerifyToken, employeeController.GetAll.bind(employeeController));
router.get("/:id", VerifyToken, employeeController.GetById.bind(employeeController));
router.put("/:id", VerifyToken, employeeController.Update.bind(employeeController));
router.delete("/:id", VerifyToken, employeeController.Delete.bind(employeeController));

export default router;
