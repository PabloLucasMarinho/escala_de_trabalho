import type { Request } from "express";
import type { ResponseRegisteredUserJson } from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";

export interface IRegisterUserUseCase {
  Execute(req: Request): Promise<ResponseRegisteredUserJson>;
}
