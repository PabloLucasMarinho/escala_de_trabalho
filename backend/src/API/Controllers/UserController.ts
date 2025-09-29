import { inject, injectable } from "tsyringe";
import type { Response } from "express";
import type { InputData } from "../../shared/communication/types/InputData.js";
import RegisterUserUseCase from "../../application/useCases/user/register/RegisterUserUseCase.js";
import GetUserProfileUseCase from "../../application/useCases/user/Profile/GetUserProfileUseCase.js";
import UpdateUserUseCase from "../../application/useCases/user/Update/UpdateUserUseCase.js";
import ChangePasswordUseCase from "../../application/useCases/user/ChangePassword/ChangePasswordUseCase.js";
import type RequestRegisterUserJson from "../../shared/communication/Requests/RequestRegisterUserJson.js";
import type RequestUpdateUserJson from "../../shared/communication/Requests/RequestUpdateUserJson.js";
import type RequestChangePasswordJson from "../../shared/communication/Requests/RequestChangePasswordJson.js";
import type ResponseRegisteredUserJson from "../../shared/communication/Responses/ResponseRegisteredUserJson.js";
import type ResponseUserProfileJson from "../../shared/communication/Responses/ResponseUserProfileJson.js";

@injectable()
export default class UserController {
  constructor(
    @inject(RegisterUserUseCase)
    private registerUserUseCase: RegisterUserUseCase,
    @inject(UpdateUserUseCase)
    private updateUserUseCase: UpdateUserUseCase,
    @inject(GetUserProfileUseCase)
    private getUserProfileUseCase: GetUserProfileUseCase,
    @inject(ChangePasswordUseCase)
    private changePasswordUseCase: ChangePasswordUseCase
  ) {}

  async Register(req: InputData<RequestRegisterUserJson>, res: Response<ResponseRegisteredUserJson>): Promise<void> {
    // Executa o caso de uso
    const response = await this.registerUserUseCase.Execute(req);

    // Devolve o status code e resposta com token
    res.status(201).json(response);
  }

  async GetUserProfile(req: InputData<null>, res: Response<ResponseUserProfileJson>): Promise<void> {
    // Executa o caso de uso
    const response = await this.getUserProfileUseCase.Execute(req);

    //Devolve o status code e resposta
    res.status(200).json(response);
  }

  async Update(req: InputData<RequestUpdateUserJson>, res: Response<null>): Promise<void> {
    // Executa o caso de uso
    await this.updateUserUseCase.Execute(req);

    // Devolve o status code
    res.status(204).send();
  }

  async ChangePassword(req: InputData<RequestChangePasswordJson>, res: Response<null>): Promise<void> {
    // Executa o caso de uso
    await this.changePasswordUseCase.Execute(req);

    // Devolve o status code
    res.status(204).send();
  }
}
