import type { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/useCases/user/Login/LoginUserUseCase.js";
import { UserRepository } from "../../infrastructure/repositories/UserRepository.js";
import { BCryptNet } from "../../infrastructure/security/BCryptNet.js";
import { JwtTokenGenerator } from "../../infrastructure/security/Tokens/Access/Generator/JwtTokenGenerator.js";

const readOnlyRepository = new UserRepository();
const passwordEncripter = new BCryptNet();
const accessTokenGenerator = new JwtTokenGenerator();
const loginUserUseCase = new LoginUserUseCase(
  readOnlyRepository,
  passwordEncripter,
  accessTokenGenerator
);

export default class LoginController {
  static async Login(req: Request, res: Response): Promise<void> {
    // Executa o caso de uso
    const response = await loginUserUseCase.Execute(req);

    // Devolve o status code e resposta com token
    res.status(200).json(response);
  }
}
