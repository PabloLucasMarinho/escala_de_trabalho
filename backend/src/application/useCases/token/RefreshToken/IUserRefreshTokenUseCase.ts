import type RequestNewTokenJson from "../../../../shared/communication/Requests/RequestNewTokenJson.js";
import type ResponseTokensJson from "../../../../shared/communication/Responses/ResponseTokensJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IUserRefreshTokenUseCase {
  Execute(req: InputData<RequestNewTokenJson>): Promise<ResponseTokensJson>;
}
