import type { Request } from "express";
import type { IUser } from "../../../../infrastructure/entities/IUser.js";
import type { IRegisterUserUseCase } from "./IRegisterUserUseCase.js";
import { RegisterUserValidator } from "./RegisterUserValidator.js";
import type { IUserReadOnlyRepository } from "../../../../domain/repositories/user/IUserReadOnlyRepository.js";
import type { IPasswordEncripter } from "../../../../domain/security/Cryptography/IPasswordEncripter.js";
import type { IUserWriteOnlyRepository } from "../../../../domain/repositories/user/IUserWriteOnlyRepository.js";
import { ResponseRegisteredUserJson } from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";
import { ResponseTokensJson } from "../../../../shared/communication/Responses/ResponseTokensJson.js";
import type { IAccessTokenGenerator } from "../../../../domain/security/Tokens/IAccessTokenGenerator.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject("IUserReadOnlyRepository")
    private readonly readOnlyRepository: IUserReadOnlyRepository,
    @inject("IUserWriteOnlyRepository")
    private readonly writeOnlyRepository: IUserWriteOnlyRepository,
    @inject("IAccessTokenGenerator")
    private readonly accessTokenGenerator: IAccessTokenGenerator,
    @inject("IPasswordEncripter")
    private readonly passwordEncripter: IPasswordEncripter
  ) {}

  async Execute(req: Request): Promise<ResponseRegisteredUserJson> {
    // Valida os dados enviados
    const user = await this.Validate(req);

    // Cria senha com hash
    user.password = this.passwordEncripter.Encrypt(req.body.password);

    // Cria o usuário no banco de dados
    const userId = await this.writeOnlyRepository.Add(user);

    const response = new ResponseRegisteredUserJson();
    const token = new ResponseTokensJson();
    token.AccessToken = this.accessTokenGenerator.Generate(userId);

    response.Name = req.body.name.toUpperCase();
    response.Token = token;

    return response;
  }

  private async Validate(req: Request): Promise<IUser> {
    const user = RegisterUserValidator.Validate(req);

    const emailExist = await this.readOnlyRepository.ExistActiveUserWithEmail(user.email);
    if (emailExist) {
      throw new Error("E-mail já cadastrado por outro usuário.");
    }

    return user;
  }
}
