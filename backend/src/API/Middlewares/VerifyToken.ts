import type { NextFunction, Request, Response } from "express";
import TokenHandler from "../../infrastructure/security/Tokens/TokenHandler.js";
import "dotenv/config";

const tokenHandler = new TokenHandler();

// Middleware para validar o token
const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = tokenHandler.Value(req);

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    const verifiedToken = tokenHandler.Verify(token);

    if (!verifiedToken || !verifiedToken.id) {
      return res.status(401).json({ error: "Token inválido." });
    }

    req.id = verifiedToken.id;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

export default VerifyToken;
