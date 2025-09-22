import type { InputData } from "../../../../shared/communication/types/Request.js";
import type { RequestEmployeeJson } from "../../../../shared/communication/Requests/RequestEmployeeJson.js";

export interface IUpdateEmployeeUseCase {
  Execute(req: InputData<RequestEmployeeJson>): Promise<void>;
}
