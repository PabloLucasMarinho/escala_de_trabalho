import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import type ResponseRegisteredShiftJson from "../../../../shared/communication/Responses/ResponseRegisteredShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IRegisterShiftUseCase {
  Execute(req: InputData<RequestShiftJson>): Promise<void>;
}
