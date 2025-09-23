import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type ResponseRegisteredUserJson from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";
import type RequestRegisterUserJson from "../../../../shared/communication/Requests/RequestRegisterUserJson.js";

export default interface IRegisterUserUseCase {
  Execute(req: InputData<RequestRegisterUserJson>): Promise<ResponseRegisteredUserJson>;
}
