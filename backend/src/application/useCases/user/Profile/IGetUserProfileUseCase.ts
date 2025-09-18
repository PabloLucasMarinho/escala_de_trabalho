import type { Request } from "express";
import type { ResponseUserProfileJson } from "../../../../shared/communication/Responses/ResponseUserProfileJson.js";

export interface IGetUserProfileUseCase {
  Execute(req: Request): Promise<ResponseUserProfileJson>;
}
