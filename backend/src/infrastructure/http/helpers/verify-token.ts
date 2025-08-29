import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import getToken from "./get-token.js";
import "dotenv/config";

// Middleware para validar o token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const secret: string = process.env.JWT_SECRET!;

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  const token = getToken(req);

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

export default verifyToken;
