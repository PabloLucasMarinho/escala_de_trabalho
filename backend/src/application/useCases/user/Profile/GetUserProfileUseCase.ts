import type { InputData } from "../../../../shared/communication/types/InputData.js";
import ResponseUserProfileJson from "../../../../shared/communication/Responses/ResponseUserProfileJson.js";
import type IGetUserProfileUseCase from "./IGetUserProfileUseCase.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

export default class GetUserProfileUseCase implements IGetUserProfileUseCase {
  async Execute(req: InputData<null>): Promise<ResponseUserProfileJson> {
    const user = await checkLoggedUser(req);

    const response = new ResponseUserProfileJson();
    response.name = user.name;
    response.email = user.email;

    return response;
  }
}
