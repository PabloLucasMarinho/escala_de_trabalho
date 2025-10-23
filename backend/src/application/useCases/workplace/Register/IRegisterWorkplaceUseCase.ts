import type RequestWorkplaceJson from "../../../../shared/communication/Requests/RequestWorkplaceJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IRegisterWorkplaceUseCase {
  Execute(req: InputData<RequestWorkplaceJson>): Promise<void>;
}
