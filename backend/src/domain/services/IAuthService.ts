import type { Request } from "express";
import type { IUser } from "../entities/IUser.js";
import type { JwtPayload } from "jsonwebtoken";

export interface IAuthService {
  create(user: IUser): string;

  getToken(req: Request): string | undefined;

  getUserId(token: string): string;
}
