import { type Request } from "express";
import type { ITokenProvider } from "../../domain/security/Tokens/ITokenProvider.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class HttpContextTokenValue implements ITokenProvider {
  private readonly _req: Request;
  constructor(req: Request) {
    this._req = req;
  }
  Value(): string {
    const authentication = this._req.headers.authorization?.split(" ")[1];

    return authentication!;
  }
}
