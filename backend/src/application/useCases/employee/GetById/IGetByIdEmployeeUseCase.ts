import type ResponseEmployeeJson from "../../../../shared/communication/Responses/ResponseEmployeeJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IGetByIdEmployeeUseCase {
  Execute(req: InputData<null>): Promise<ResponseEmployeeJson>;
}
