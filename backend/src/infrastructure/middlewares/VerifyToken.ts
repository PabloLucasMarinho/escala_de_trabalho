import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AuthService } from "../services/AuthService.js";

const authService = new AuthService();

// Middleware para validar o token
const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
  const secret: string = process.env.JWT_SECRET!;

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  const token = authService.getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  try {
    const verified = jwt.verify(token, secret);

    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido." });
  }
};

export default VerifyToken;
