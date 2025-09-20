import { type Request, type Response } from "express";
import { RegisterUserUseCase } from "../../application/useCases/user/register/RegisterUserUseCase.js";
import { GetUserProfileUseCase } from "../../application/useCases/user/Profile/GetUserProfileUseCase.js";
import { inject, injectable } from "tsyringe";
import { UpdateUserUseCase } from "../../application/useCases/user/Update/UpdateUserUseCase.js";

@injectable()
export default class UserController {
  constructor(
    @inject(RegisterUserUseCase)
    private registerUserUseCase: RegisterUserUseCase,
    @inject(UpdateUserUseCase)
    private updateUserUseCase: UpdateUserUseCase,
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
    const response = await this.getUserProfileUseCase.Execute(req);

    //Devolve o status code e resposta
    res.status(200).json(response);
  }

  public async Update(req: Request, res: Response): Promise<void> {
    // Executa o caso de uso
    const response = await this.updateUserUseCase.Execute(req);

    // Devolve o status code
    res.status(204).json({ message: "Cadastro atualizado com sucesso." });
  }

  public async ChangePassword(req: Request, res: Response): Promise<void> {}
}
