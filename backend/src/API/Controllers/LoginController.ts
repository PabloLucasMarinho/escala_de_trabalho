import type { Response } from "express";
import LoginUserUseCase from "../../application/useCases/user/Login/LoginUserUseCase.js";
import { inject, injectable } from "tsyringe";
import type { InputData } from "../../shared/communication/types/InputData.js";
import type RequestLoginJson from "../../shared/communication/Requests/RequestLoginJson.js";

@injectable()
export default class LoginController {
  constructor(@inject(LoginUserUseCase) private loginUserUseCase: LoginUserUseCase) {}

  public async Login(req: InputData<RequestLoginJson>, res: Response): Promise<void> {
    // Executa o caso de uso
    const response = await this.loginUserUseCase.Execute(req);
    // Devolve o status code e resposta com token
    res.status(200).json(response);
  }
}
