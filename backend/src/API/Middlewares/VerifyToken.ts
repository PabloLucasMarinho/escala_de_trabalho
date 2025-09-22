import type { NextFunction, Request, Response } from "express";
import { TokenHandler } from "../../infrastructure/security/Tokens/TokenHandler.js";
import "dotenv/config";

const tokenHandler = new TokenHandler();

// Middleware para validar o token
const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = tokenHandler.Value(req);

  const verifiedToken = tokenHandler.Verify(token);

  req.id = verifiedToken.id;
  next();
};

export default VerifyToken;
