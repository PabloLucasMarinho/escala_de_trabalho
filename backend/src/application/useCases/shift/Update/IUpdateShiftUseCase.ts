import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IUpdateShiftUseCase {
  Execute(req: InputData<RequestShiftJson>): Promise<void>;
}
