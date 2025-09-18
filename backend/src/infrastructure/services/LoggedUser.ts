import type { ILoggedUser } from "../../domain/services/ILoggedUser.js";
import type { IUser } from "../entities/IUser.js";
import User from "../../domain/entities/User.js";
import { TokenHandler } from "../security/Tokens/TokenHandler.js";
import type { Request } from "express";
import type { Types } from "mongoose";

const tokenHandler = new TokenHandler();

export class LoggedUser implements ILoggedUser {
  private readonly _req: Request;
  constructor(req: Request) {
    this._req = req;
  }

  async User(): Promise<IUser> {
    const token = tokenHandler.Value(this._req);

    const userId = tokenHandler.Verify(token);

    const user = await User.findById(userId.id).where("active", true).exec();

    return user!;
  }
}
