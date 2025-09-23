import { ResponseRegisteredUserJson } from "../../../../shared/communication/Responses/ResponseRegisteredUserJson.js";
import type { ILoginUserUseCase } from "./ILoginUserUseCase.js";
import type { IUserReadOnlyRepository } from "../../../../domain/repositories/user/IUserReadOnlyRepository.js";
import type { IPasswordEncripter } from "../../../../domain/security/Cryptography/IPasswordEncripter.js";
import type { IAccessTokenGenerator } from "../../../../domain/security/Tokens/IAccessTokenGenerator.js";
import { ResponseTokensJson } from "../../../../shared/communication/Responses/ResponseTokensJson.js";
import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/Request.js";
import type RequestLoginJson from "../../../../shared/communication/Requests/RequestLoginJson.js";

@injectable()
export default class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject("IUserReadOnlyRepository")
    private readonly readOnlyRepository: IUserReadOnlyRepository,
    @inject("IPasswordEncripter")
    private readonly passwordEncripter: IPasswordEncripter,
    @inject("IAccessTokenGenerator")
    private readonly tokenHandler: IAccessTokenGenerator
  ) {}

  async Execute(req: InputData<RequestLoginJson>): Promise<ResponseRegisteredUserJson> {
    const user = await this.readOnlyRepository.GetByEmail(req.body.email);

    if (!user || !this.passwordEncripter.IsValid(req.body.password, user.password)) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const response = new ResponseRegisteredUserJson();
    const token = new ResponseTokensJson();
    token.accessToken = this.tokenHandler.Generate(user._id!);
    response.name = user.name;
    response.token = token;

    return response;
  }
}
