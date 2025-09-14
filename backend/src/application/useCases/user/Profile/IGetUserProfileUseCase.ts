import type { ILoggedUser } from "../../../../domain/services/ILoggedUser.js";
import type { ResponseUserProfileJson } from "../../../../shared/communication/Responses/ResponseUserProfileJson.js";

export interface IGetUserProfileUseCase {
  Execute(loggedUser: ILoggedUser): Promise<ResponseUserProfileJson>;
}
