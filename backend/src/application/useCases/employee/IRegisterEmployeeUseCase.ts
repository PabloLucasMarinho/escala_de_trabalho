import type { Request } from "express";
import type { RequestRegisterEmployeeJson } from "../../../shared/communication/Requests/RequestRegisterEmployeeJson.js";
import type { ResponseRegisteredEmployeeJson } from "../../../shared/communication/Responses/ResponseRegisteredEmployeeJson.js";

export interface IRegisterEmployeeUseCase {
  Execute(req: Request<unknown, unknown, RequestRegisterEmployeeJson>): Promise<ResponseRegisteredEmployeeJson>;
}
