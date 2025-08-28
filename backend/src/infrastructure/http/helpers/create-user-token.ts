import type { Request, Response } from "express";
import type { IUser } from "../../../domain/entities/IUser.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createUserToken = async (user: IUser, req: Request, res: Response) => {
  const secret: string = process.env.JWT_SECRET!;

  if (!secret) {
    return res.status(500).json({ error: "Chave secreta não configurada." });
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    secret
  );
};
