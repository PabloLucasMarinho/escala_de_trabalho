import { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../domain/entities/IUser.ts";

declare module "express" {
  export interface Request {
    user?: string | JwtPayload;
  }
}
