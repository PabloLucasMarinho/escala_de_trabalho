import { type Request, type Response } from "express";
import { RegisterUserUseCase } from "../../application/useCases/user/register/RegisterUserUseCase.js";
import { GetUserProfileUseCase } from "../../application/useCases/user/Profile/GetUserProfileUseCase.js";
import { inject, injectable } from "tsyringe";
import { HttpContextTokenValue } from "../Token/HttpContextTokenValue.js";
import { LoggedUser } from "../../infrastructure/services/LoggedUser.js";

@injectable()
export default class UserController {
  constructor(
    @inject(RegisterUserUseCase)
    private registerUserUseCase: RegisterUserUseCase,
    @inject(GetUserProfileUseCase)
    private getUserProfileUseCase: GetUserProfileUseCase
  ) {}

  public async Register(req: Request, res: Response): Promise<void> {
    // Executa o caso de uso
    const response = await this.registerUserUseCase.Execute(req);

    // Devolve o status code e resposta com token
    res.status(201).json(response);
  }

  public async GetUserProfile(req: Request, res: Response): Promise<void> {
    // Executa o caso de uso
    const response = await this.getUserProfileUseCase.Execute();

    //Devolve o status code e resposta
    res.status(200).json();
  }
}
