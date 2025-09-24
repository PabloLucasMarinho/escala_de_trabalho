import { inject, injectable } from "tsyringe";
import type { Response } from "express";
import type { InputData } from "../../shared/communication/types/InputData.js";
import type RequestRegisterShiftJson from "../../shared/communication/Requests/RequestRegisterShiftJson.js";
import type ResponseRegisteredShiftJson from "../../shared/communication/Responses/ResponseRegisteredShiftJson.js";
import RegisterShiftUseCase from "../../application/useCases/shift/Register/RegisterShiftUseCase.js";

@injectable()
export default class ShiftController {
  constructor(@inject(RegisterShiftUseCase) private registerShiftUseCase: RegisterShiftUseCase) {}

  async Register(req: InputData<RequestRegisterShiftJson>, res: Response<ResponseRegisteredShiftJson>): Promise<void> {
    const response = await this.registerShiftUseCase.Execute(req);

    res.status(201).json(response);
  }
}
