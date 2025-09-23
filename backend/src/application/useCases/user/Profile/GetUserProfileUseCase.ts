import type { InputData } from "../../../../shared/communication/types/Request.js";
import { ResponseUserProfileJson } from "../../../../shared/communication/Responses/ResponseUserProfileJson.js";
import type { IGetUserProfileUseCase } from "./IGetUserProfileUseCase.js";
import LoggedUser from "../../../../infrastructure/services/LoggedUser.js";

export default class GetUserProfileUseCase implements IGetUserProfileUseCase {
  async Execute(req: InputData<any>): Promise<ResponseUserProfileJson> {
    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    const response = new ResponseUserProfileJson();
    response.name = user.name;
    response.email = user.email;

    return response;
  }
}
