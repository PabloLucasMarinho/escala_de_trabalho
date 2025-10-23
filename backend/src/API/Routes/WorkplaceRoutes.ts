import { Router } from "express";
import { container } from "tsyringe";
import VerifyToken from "../Middlewares/VerifyToken.js";
import WorkplaceController from "../Controllers/WorkplaceController.js";

const router = Router();

// Dependências
const workplaceController = container.resolve(WorkplaceController);

router.post("/register", VerifyToken, workplaceController.Register.bind(workplaceController));
router.get("/getall", VerifyToken, workplaceController.GetAll.bind(workplaceController));
router.get("/:id", VerifyToken, workplaceController.GetById.bind(workplaceController));
router.put("/:id", VerifyToken, workplaceController.Update.bind(workplaceController));
router.delete("/:id", VerifyToken, workplaceController.Delete.bind(workplaceController));

export default router;
