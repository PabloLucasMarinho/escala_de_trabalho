import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestRegisterUserJson from "../../../../shared/communication/Requests/RequestRegisterUserJson.js";
import type IUser from "../../../../infrastructure/entities/IUser.js";
import type IRegisterUserUseCase from "./IRegisterUserUseCase.js";
import RegisterUserValidator from "./RegisterUserValidator.js";
import type IUserReadOnlyRepository from "../../../../domain/repositories/user/IUserReadOnlyRepository.js";
import type IPasswordEncripter from "../../../../domain/security/Cryptography/IPasswordEncripter.js";
import type IUserWriteOnlyRepository from "../../../../domain/repositories/user/IUserWriteOnlyRepository.js";
import ResponseRegisteredUserJson from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";
import ResponseTokensJson from "../../../../shared/communication/Responses/ResponseTokensJson.js";
import type IAccessTokenGenerator from "../../../../domain/security/Tokens/IAccessTokenGenerator.js";
import { NameFormatter } from "../../../Services/NameFormatter.js";
import RefreshToken from "../../../../domain/entities/RefreshToken.js";
import type IRefreshTokenGenerator from "../../../../domain/security/Tokens/IRefreshTokenGenerator.js";
import type ITokenRepository from "../../../../domain/repositories/Token/ITokenRepository.js";

@injectable()
export default class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject("IUserReadOnlyRepository")
    private readonly readOnlyRepository: IUserReadOnlyRepository,
    @inject("IUserWriteOnlyRepository")
    private readonly writeOnlyRepository: IUserWriteOnlyRepository,
    @inject("ITokenRepository")
    private readonly tokenRepository: ITokenRepository,
    @inject("IAccessTokenGenerator")
    private readonly accessTokenGenerator: IAccessTokenGenerator,
    @inject("IRefreshTokenGenerator")
    private readonly refreshTokenGenerator: IRefreshTokenGenerator,
    @inject("IPasswordEncripter")
    private readonly passwordEncripter: IPasswordEncripter
  ) {}

  async Execute(req: InputData<RequestRegisterUserJson>): Promise<ResponseRegisteredUserJson> {
    // Valida os dados enviados
    const user = await this.Validate(req);

    // Cria senha com hash
    user.password = this.passwordEncripter.Encrypt(req.body.password);

    // Cria o usuário no banco de dados
    const userId = await this.writeOnlyRepository.Add(user);

    const response = new ResponseRegisteredUserJson();
    const token = new ResponseTokensJson();
    const refreshToken = await this.CreateAndSaveRefreshToken(userId.toString());

    token.accessToken = this.accessTokenGenerator.Generate(userId);
    token.refreshToken = refreshToken;

    response.id = userId.toString();
    response.name = NameFormatter(user.name);
    response.token = token;

    return response;
  }

  private async Validate(req: InputData<RequestRegisterUserJson>): Promise<IUser> {
    const user = RegisterUserValidator.Validate(req);

    const emailExist = await this.readOnlyRepository.ExistActiveUserWithEmail(user.email);
    if (emailExist) {
      throw new Error("E-mail já cadastrado por outro usuário.");
    }

    return user;
  }

  private async CreateAndSaveRefreshToken(userId: string) {
    const refreshToken = new RefreshToken({
      value: this.refreshTokenGenerator.GenerateRefreshToken(),
      userId: userId,
    });

    await this.tokenRepository.SaveNewRefreshToken(refreshToken);

    return refreshToken.value;
  }
}
