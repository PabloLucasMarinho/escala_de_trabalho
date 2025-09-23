import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestChangePasswordJson from "../../../../shared/communication/Requests/RequestChangePasswordJson.js";

export default interface IChangePasswordUseCase {
  Execute(req: InputData<RequestChangePasswordJson>): Promise<void>;
}
