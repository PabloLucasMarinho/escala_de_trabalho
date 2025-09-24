import "reflect-metadata";
import "../infrastructure/DependencyInjectionExtension.js";
import "../application/DependencyInjectionExtension.js";
import express from "express";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import EmployeeRoutes from "./Routes/EmployeeRoutes.js";
import WorkplaceRoutes from "./Routes/WorkplaceRoutes.js";
import ShiftRoutes from "./Routes/ShiftRoutes.js";
import { ErrorHandler } from "./Middlewares/ErrorHandler.js";

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Routes
app.use("/user", UserRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/workplace", WorkplaceRoutes);
app.use("/shift", ShiftRoutes);

// Middleware de erros
app.use(ErrorHandler);

app.listen(5000);
