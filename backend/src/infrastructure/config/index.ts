import express from "express";
import cors from "cors";
import UserRoutes from "../http/routes/UserRoutes.js";
import EmployeeRoutes from "../http/routes/EmployeeRoutes.js";
import ShiftRoutes from "../http/routes/ShiftRoutes.js";
import WorkplaceRoutes from "../http/routes/WorkplaceRoutes.js";
import { ErrorHandler } from "../middlewares/ErrorHandler.js";

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Routes
app.use("/users", UserRoutes);
app.use("/employees", EmployeeRoutes);
app.use("/shift", ShiftRoutes);
app.use("/workplaces", WorkplaceRoutes);

// Middleware de erros
app.use(ErrorHandler);

app.listen(5000);
