import type { IUser } from "../../domain/entities/IUser.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import type { Request } from "express";
import type { IAuthService } from "../../domain/services/IAuthService.js";

const secret: string = process.env.JWT_SECRET!;
if (!secret) {
  throw new Error("Chave secreta não configurada.");
}

export class AuthService implements IAuthService {
  create(user: IUser): string {
    // Cria o token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      secret
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
    const decoded = jwt.verify(token, secret);

    // Verificação do tipo payload
    if (typeof decoded !== "object" || !("id" in decoded)) {
      throw new Error("Token inválido ou corrompido.");
    }

    const userId = decoded.id as string;

    return userId;
  }
}
