import { inject, injectable } from "tsyringe";
import type { ILoggedUser } from "../../../../domain/services/ILoggedUser.js";
import { ResponseUserProfileJson } from "../../../../shared/communication/Responses/ResponseUserProfileJson.js";
import type { IGetUserProfileUseCase } from "./IGetUserProfileUseCase.js";
import { LoggedUser } from "../../../../infrastructure/services/LoggedUser.js";

@injectable()
export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(@inject(LoggedUser) private readonly loggedUser: ILoggedUser) {}

  async Execute(): Promise<ResponseUserProfileJson> {
    const user = await this.loggedUser.User();

    const response = new ResponseUserProfileJson();
    response.Name = user.name;
    response.Email = user.email;

    return response;
  }
}
