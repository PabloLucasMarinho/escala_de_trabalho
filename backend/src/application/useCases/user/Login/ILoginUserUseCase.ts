import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestLoginJson from "../../../../shared/communication/Requests/RequestLoginJson.js";
import type ResponseRegisteredUserJson from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";

export default interface ILoginUserUseCase {
  Execute(req: InputData<RequestLoginJson>): Promise<ResponseRegisteredUserJson>;
}
