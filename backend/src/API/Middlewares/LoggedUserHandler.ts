import type { NextFunction, Request, Response } from "express";
import { HttpContextTokenValue } from "../Token/HttpContextTokenValue.js";
import { container } from "tsyringe";
import type { ITokenProvider } from "../../domain/security/Tokens/ITokenProvider.js";
import type { ILoggedUser } from "../../domain/services/ILoggedUser.js";
import { LoggedUser } from "../../infrastructure/services/LoggedUser.js";

export async function LoggedUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenProvider = new HttpContextTokenValue(req);

  container.registerInstance<ITokenProvider>("ITokenProvider", tokenProvider);

  container.register<ILoggedUser>("ILoggedUser", { useClass: LoggedUser });

  next();
}
