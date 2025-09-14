import type { Request } from "express";
import { ResponseRegisteredUserJson } from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";
import type { ILoginUserUseCase } from "./ILoginUserUseCase.js";
import type { IUserReadOnlyRepository } from "../../../../domain/repositories/user/IUserReadOnlyRepository.js";
import type { IPasswordEncripter } from "../../../../domain/security/Cryptography/IPasswordEncripter.js";
import type { IAccessTokenGenerator } from "../../../../domain/security/Tokens/IAccessTokenGenerator.js";
import { ResponseTokensJson } from "../../../../shared/communication/Responses/ResponseTokensJson.js";

export class LoginUserUseCase implements ILoginUserUseCase {
  private readonly _readOnlyRepository: IUserReadOnlyRepository;
  private readonly _passwordEncripter: IPasswordEncripter;
  private readonly _accessTokenGenerator: IAccessTokenGenerator;

  constructor(
    readOnlyRepository: IUserReadOnlyRepository,
    passwordEncripter: IPasswordEncripter,
    accessTokenGenerator: IAccessTokenGenerator
  ) {
    this._readOnlyRepository = readOnlyRepository;
    this._passwordEncripter = passwordEncripter;
    this._accessTokenGenerator = accessTokenGenerator;
  }

  async Execute(req: Request): Promise<ResponseRegisteredUserJson> {
    console.log("Entrou no Use Case");

    const user = await this._readOnlyRepository.GetByEmail(req.body.email);

    if (
      !user ||
      !this._passwordEncripter.IsValid(req.body.password, user.password)
    ) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const response = new ResponseRegisteredUserJson();
    const token = new ResponseTokensJson();
    token.AccessToken = this._accessTokenGenerator.Generate(user._id!);
    response.Name = user.name;
    response.Token = token;

    return response;
  }
}
