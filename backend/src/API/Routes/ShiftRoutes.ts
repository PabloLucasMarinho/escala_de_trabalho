// Middleware
import { Router } from "express";
import VerifyToken from "../Middlewares/VerifyToken.js";
import { container } from "tsyringe";
import ShiftController from "../Controllers/ShiftController.js";

const router = Router();

// Dependências
const shiftController = container.resolve(ShiftController);

router.post("/register", VerifyToken, shiftController.Register.bind(shiftController));
router.get("/getall", VerifyToken, shiftController.GetAll.bind(shiftController));
router.get("/filter", VerifyToken, shiftController.Filter.bind(shiftController));
router.get("/:id", VerifyToken, shiftController.GetById.bind(shiftController));
router.put("/:id", VerifyToken, shiftController.Update.bind(shiftController));
router.delete("/:id", VerifyToken, shiftController.Delete.bind(shiftController));

export default router;
