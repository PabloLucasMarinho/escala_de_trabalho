import { inject, injectable } from "tsyringe";
import type { InputData } from "../../shared/communication/types/InputData.js";
import type { Response } from "express";
import type ResponseTokensJson from "../../shared/communication/Responses/ResponseTokensJson.js";
import type RequestNewTokenJson from "../../shared/communication/Requests/RequestNewTokenJson.js";
import UserRefreshTokenUseCase from "../../application/useCases/token/RefreshToken/UserRefreshTokenUseCase.js";

@injectable()
export default class TokenController {
  constructor(@inject(UserRefreshTokenUseCase) private userRefreshTokenUseCase: UserRefreshTokenUseCase) {}

  async RefreshToken(req: InputData<RequestNewTokenJson>, res: Response<ResponseTokensJson>): Promise<void> {
    const response = await this.userRefreshTokenUseCase.Execute(req);

    res.status(200).json(response);
  }
}
