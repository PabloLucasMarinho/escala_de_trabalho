import type ResponseRegisteredWorkplaceJson from "../../../../shared/communication/Responses/ResponseRegisteredWorkplaceJson.js";
import type ResponseWorkplaceJson from "../../../../shared/communication/Responses/ResponseWorkplaceJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IGetByIdWorkplaceUseCase {
  Execute(req: InputData<any>): Promise<ResponseWorkplaceJson>;
}
