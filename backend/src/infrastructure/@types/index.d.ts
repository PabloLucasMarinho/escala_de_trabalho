import { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { IUser } from "../entities/IUser.ts";

declare module "express" {
  export interface Request {
    id?: string | JwtPayload;
  }
}
