import type RequestRegisterShiftJson from "../../../../shared/communication/Requests/RequestRegisterShiftJson.js";
import type ResponseRegisteredShiftJson from "../../../../shared/communication/Responses/ResponseRegisteredShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IRegisterShiftUseCase {
  Execute(req: InputData<RequestRegisterShiftJson>): Promise<ResponseRegisteredShiftJson>;
}
