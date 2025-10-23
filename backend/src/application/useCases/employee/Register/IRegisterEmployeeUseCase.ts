import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestEmployeeJson from "../../../../shared/communication/Requests/RequestEmployeeJson.js";

export default interface IRegisterEmployeeUseCase {
  Execute(req: InputData<RequestEmployeeJson>): Promise<void>;
}
