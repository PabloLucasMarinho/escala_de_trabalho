import { inject, injectable } from "tsyringe";
import ResponseRegisteredUserJson from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";
import type ILoginUserUseCase from "./ILoginUserUseCase.js";
import type IUserReadOnlyRepository from "../../../../domain/repositories/user/IUserReadOnlyRepository.js";
import type IPasswordEncripter from "../../../../domain/security/Cryptography/IPasswordEncripter.js";
import type IAccessTokenGenerator from "../../../../domain/security/Tokens/IAccessTokenGenerator.js";
import ResponseTokensJson from "../../../../shared/communication/Responses/ResponseTokensJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestLoginJson from "../../../../shared/communication/Requests/RequestLoginJson.js";
import type IRefreshTokenGenerator from "../../../../domain/security/Tokens/IRefreshTokenGenerator.js";
import type IUser from "../../../../infrastructure/entities/IUser.js";
import RefreshToken from "../../../../domain/entities/RefreshToken.js";
import type ITokenRepository from "../../../../domain/repositories/Token/ITokenRepository.js";

@injectable()
export default class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject("IUserReadOnlyRepository")
    private readonly readOnlyRepository: IUserReadOnlyRepository,
    @inject("ITokenRepository")
    private readonly tokenRepository: ITokenRepository,
    @inject("IPasswordEncripter")
    private readonly passwordEncripter: IPasswordEncripter,
    @inject("IAccessTokenGenerator")
    private readonly accessTokenGenerator: IAccessTokenGenerator,
    @inject("IRefreshTokenGenerator")
    private readonly refreshTokenGenerator: IRefreshTokenGenerator
  ) {}

  async Execute(req: InputData<RequestLoginJson>): Promise<ResponseRegisteredUserJson> {
    const user = await this.readOnlyRepository.GetByEmail(req.body.email);

    if (!user || !this.passwordEncripter.IsValid(req.body.password, user.password)) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const response = new ResponseRegisteredUserJson();
    const token = new ResponseTokensJson();
    const refreshToken = await this.CreateAndSaveRefreshToken(user);

    token.accessToken = this.accessTokenGenerator.Generate(user._id!);
    token.refreshToken = refreshToken;

    response.id = user._id!.toString();
    response.name = user.name;
    response.token = token;

    return response;
  }

  private async CreateAndSaveRefreshToken(user: IUser) {
    const refreshToken = new RefreshToken({
      value: this.refreshTokenGenerator.GenerateRefreshToken(),
      userId: user._id,
    });

    await this.tokenRepository.SaveNewRefreshToken(refreshToken);

    return refreshToken.value;
  }
}
