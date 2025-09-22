import type { Request } from "express";
import type { ResponseEmployeeJson } from "../../../../shared/communication/Responses/ResponseEmployeeJson.js";

export interface IGetByIdEmployeeUseCase {
  Execute(req: Request): Promise<ResponseEmployeeJson>;
}
