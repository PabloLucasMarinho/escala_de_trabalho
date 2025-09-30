import type IAccessTokenGenerator from "../../../domain/security/Tokens/IAccessTokenGenerator.js";
import type ITokenProvider from "../../../domain/security/Tokens/ITokenProvider.js";
import "dotenv/config";
import type { Types } from "mongoose";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { InputData } from "../../../shared/communication/types/InputData.js";

export default class TokenHandler implements IAccessTokenGenerator, ITokenProvider {
  private readonly secret = process.env.JWT_SECRET!;

  Generate(userId: Types.ObjectId): string {
    if (!this.secret) {
      throw new Error("Segredo não cadastrado.");
    }

    const token = jwt.sign(
      {
        id: userId.toString(),
      },
      this.secret,
      {
        expiresIn: "24h",
      }
    );

    return token;
  }

  Value(req: InputData<any>): string {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Acesso negado.");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Acesso negado.");
    }

    return token;
  }

  Verify(token: string): JwtPayload {
    if (!this.secret) {
      throw new Error("Segredo não cadastrado.");
    }

    try {
      const verifiedToken = jwt.verify(token, this.secret);

      return verifiedToken as JwtPayload;
    } catch (error) {
      throw new Error("Token inválido.");
    }
  }
}
