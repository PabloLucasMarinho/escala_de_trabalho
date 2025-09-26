import type RequestFilterShiftJson from "../../../../shared/communication/Requests/RequestFilterShiftJson.js";
import type ResponseShiftJson from "../../../../shared/communication/Responses/ResponseShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IFilterShiftUseCase {
  Execute(req: InputData<RequestFilterShiftJson>): Promise<ResponseShiftJson[] | null>;
}
