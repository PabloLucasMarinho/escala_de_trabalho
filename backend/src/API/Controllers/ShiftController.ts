import { inject, injectable } from "tsyringe";
import type { Response } from "express";
import type { InputData } from "../../shared/communication/types/InputData.js";
import type RequestRegisterShiftJson from "../../shared/communication/Requests/RequestRegisterShiftJson.js";
import type ResponseRegisteredShiftJson from "../../shared/communication/Responses/ResponseRegisteredShiftJson.js";
import RegisterShiftUseCase from "../../application/useCases/shift/Register/RegisterShiftUseCase.js";
import type RequestFilterShiftJson from "../../shared/communication/Requests/RequestFilterShiftJson.js";
import type ResponseShiftJson from "../../shared/communication/Responses/ResponseShiftJson.js";
import FilterShiftUseCase from "../../application/useCases/shift/Filter/FilterShiftUseCase.js";

@injectable()
export default class ShiftController {
  constructor(
    @inject(RegisterShiftUseCase) private registerShiftUseCase: RegisterShiftUseCase,
    @inject(FilterShiftUseCase) private filterShiftUseCase: FilterShiftUseCase
  ) {}

  async Register(req: InputData<RequestRegisterShiftJson>, res: Response<ResponseRegisteredShiftJson>): Promise<void> {
    const response = await this.registerShiftUseCase.Execute(req);

    res.status(201).json(response);
  }

  async Filter(req: InputData<RequestFilterShiftJson>, res: Response<ResponseShiftJson[] | null>): Promise<void> {
    const response = await this.filterShiftUseCase.Execute(req);

    res.status(200).json(response);
  }
}
