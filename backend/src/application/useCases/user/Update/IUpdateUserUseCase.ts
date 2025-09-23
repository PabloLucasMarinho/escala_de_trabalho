import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestUpdateUserJson from "../../../../shared/communication/Requests/RequestUpdateUserJson.js";

export default interface IUpdateUserUseCase {
  Execute(req: InputData<RequestUpdateUserJson>): Promise<void>;
}
