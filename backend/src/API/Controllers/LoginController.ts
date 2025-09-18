import type { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/useCases/user/Login/LoginUserUseCase.js";
import { inject, injectable } from "tsyringe";

@injectable()
export default class LoginController {
  constructor(
    @inject(LoginUserUseCase) private loginUserUseCase: LoginUserUseCase
  ) {}
  public async Login(req: Request, res: Response): Promise<void> {
    // Executa o caso de uso
    const response = await this.loginUserUseCase.Execute(req);
    // Devolve o status code e resposta com token
    res.status(200).json(response);
  }
}
