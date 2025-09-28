import type ResponseShiftJson from "../../../../shared/communication/Responses/ResponseShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IGetByIdShiftUseCase {
  Execute(req: InputData<any>): Promise<ResponseShiftJson>;
}
