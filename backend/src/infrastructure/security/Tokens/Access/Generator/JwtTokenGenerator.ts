import type { Types } from "mongoose";
import type { IAccessTokenGenerator } from "../../../../../domain/security/Tokens/IAccessTokenGenerator.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export class JwtTokenGenerator implements IAccessTokenGenerator {
  private readonly secret: string = process.env.JWT_SECRET!;

  Generate(userId: Types.ObjectId): string {
    const token = jwt.sign(
      {
        id: userId.toString(),
      },
      this.secret
    );

    return token;
  }
}
