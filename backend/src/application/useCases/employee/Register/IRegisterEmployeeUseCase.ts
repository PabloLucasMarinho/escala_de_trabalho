import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestEmployeeJson from "../../../../shared/communication/Requests/RequestEmployeeJson.js";
import type ResponseRegisteredEmployeeJson from "../../../../shared/communication/Responses/ResponseRegisteredEmployeeJson.js";

export default interface IRegisterEmployeeUseCase {
  Execute(req: InputData<RequestEmployeeJson>): Promise<ResponseRegisteredEmployeeJson>;
}
