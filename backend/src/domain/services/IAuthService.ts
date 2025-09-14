import type { Request } from "express";
import type { IUser } from "../../infrastructure/entities/IUser.js";

export interface IAuthService {
  create(user: IUser): string;

  getToken(req: Request): string | undefined;

  getUserId(token: string): string;
}
