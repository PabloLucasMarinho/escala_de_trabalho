import type { Request } from "express";
import { ResponseUserProfileJson } from "../../../../shared/communication/Responses/ResponseUserProfileJson.js";
import type { IGetUserProfileUseCase } from "./IGetUserProfileUseCase.js";
import { LoggedUser } from "../../../../infrastructure/services/LoggedUser.js";

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  async Execute(req: Request): Promise<ResponseUserProfileJson> {
    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    const response = new ResponseUserProfileJson();
    response.Name = user.name;
    response.Email = user.email;

    return response;
  }
}
