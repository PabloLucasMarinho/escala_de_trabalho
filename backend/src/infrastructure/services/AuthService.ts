import type { IUser } from "../entities/IUser.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import type { Request } from "express";
import type { IAuthService } from "../../domain/services/IAuthService.js";

export class AuthService implements IAuthService {
  private readonly secret: string;
  constructor() {
    this.secret = process.env.JWT_SECRET!;
  }
  create(user: IUser): string {
    // Cria o token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      this.secret
    );

    return token;
  }

  getToken(req: Request): string | undefined {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    return token;
  }

  getUserId(token: string): string {
    // Decodificação do token
    const decoded = jwt.verify(token, this.secret);

    // Verificação do tipo payload
    if (typeof decoded !== "object" || !("id" in decoded)) {
      throw new Error("Token inválido ou corrompido.");
    }

    const userId = decoded.id as string;

    return userId;
  }
}
