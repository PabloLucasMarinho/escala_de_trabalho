import { inject, injectable } from "tsyringe";
import type RequestNewTokenJson from "../../../../shared/communication/Requests/RequestNewTokenJson.js";
import type ResponseTokensJson from "../../../../shared/communication/Responses/ResponseTokensJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IUserRefreshTokenUseCase from "./IUserRefreshTokenUseCase.js";
import type ITokenRepository from "../../../../domain/repositories/Token/ITokenRepository.js";
import type IAccessTokenGenerator from "../../../../domain/security/Tokens/IAccessTokenGenerator.js";
import type IRefreshTokenGenerator from "../../../../domain/security/Tokens/IRefreshTokenGenerator.js";

@injectable()
export default class UserRefreshTokenUseCase implements IUserRefreshTokenUseCase {
  constructor(
    @inject("ITokenRepository") private readonly tokenRepository: ITokenRepository,
    @inject("IAccessTokenGenerator") private readonly accessTokenGenerator: IAccessTokenGenerator,
    @inject("IRefreshTokenGenerator") private readonly refreshTokenGenerator: IRefreshTokenGenerator
  ) {}

  async Execute(req: InputData<RequestNewTokenJson>): Promise<ResponseTokensJson> {
    const refreshToken = await this.tokenRepository.Get(req.body.refreshToken);

    if (!refreshToken) {
      throw new Error("Token não encontrado.");
    }

    const expirationDate = new Date(refreshToken.createdAt!.getTime());
    expirationDate.setDate(refreshToken.createdAt!.getDate() + 7);

    if (expirationDate.getTime() < Date.now()) {
      throw new Error("Token expirado.");
    }

    const newRefreshTokenValue = this.refreshTokenGenerator.GenerateRefreshToken();

    const newRefreshToken = {
      value: newRefreshTokenValue,
      userId: refreshToken.userId,
      createdAt: new Date(),
    };

    await this.tokenRepository.SaveNewRefreshToken(newRefreshToken);

    const newAccessToken = this.accessTokenGenerator.Generate(refreshToken.userId);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken.value,
    };
  }
}
