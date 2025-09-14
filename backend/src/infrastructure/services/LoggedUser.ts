import type { ITokenProvider } from "../../domain/security/Tokens/ITokenProvider.js";
import type { ILoggedUser } from "../../domain/services/ILoggedUser.js";
import type { IUser } from "../entities/IUser.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../../domain/entities/User.js";
import { inject, injectable } from "tsyringe";
import { HttpContextTokenValue } from "../../API/Token/HttpContextTokenValue.js";

const secret: string = process.env.JWT_SECRET!;

@injectable()
export class LoggedUser implements ILoggedUser {
  constructor(
    @inject("ITokenProvider")
    private readonly tokenProvider: ITokenProvider
  ) {}

  async User(): Promise<IUser> {
    const token = this.tokenProvider.Value();

    const userId = jwt.verify(token, secret) as string;

    const user = await User.findById(userId).where("active", true).exec();

    return user!;
  }
}
