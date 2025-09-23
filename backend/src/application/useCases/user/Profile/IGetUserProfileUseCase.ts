import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type ResponseUserProfileJson from "../../../../shared/communication/Responses/ResponseUserProfileJson.js";

export default interface IGetUserProfileUseCase {
  Execute(req: InputData<any>): Promise<ResponseUserProfileJson>;
}
