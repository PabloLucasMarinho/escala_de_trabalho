import { inject, injectable } from "tsyringe";
import type { Response } from "express";
import type { InputData } from "../../shared/communication/types/InputData.js";
import type RequestShiftJson from "../../shared/communication/Requests/RequestShiftJson.js";
import type ResponseRegisteredShiftJson from "../../shared/communication/Responses/ResponseRegisteredShiftJson.js";
import RegisterShiftUseCase from "../../application/useCases/shift/Register/RegisterShiftUseCase.js";
import type RequestFilterShiftJson from "../../shared/communication/Requests/RequestFilterShiftJson.js";
import type ResponseShiftJson from "../../shared/communication/Responses/ResponseShiftJson.js";
import FilterShiftUseCase from "../../application/useCases/shift/Filter/FilterShiftUseCase.js";
import GetByIdShiftUseCase from "../../application/useCases/shift/GetById/GetByIdShiftUseCase.js";
import UpdateShiftUseCase from "../../application/useCases/shift/Update/UpdateShiftUseCase.js";
import DeleteShiftUseCase from "../../application/useCases/shift/Delete/DeleteShiftUseCase.js";

@injectable()
export default class ShiftController {
  constructor(
    @inject(RegisterShiftUseCase) private registerShiftUseCase: RegisterShiftUseCase,
    @inject(FilterShiftUseCase) private filterShiftUseCase: FilterShiftUseCase,
    @inject(GetByIdShiftUseCase) private getByIdShiftUseCase: GetByIdShiftUseCase,
    @inject(UpdateShiftUseCase) private updateShiftUseCase: UpdateShiftUseCase,
    @inject(DeleteShiftUseCase) private deleteShiftUseCase: DeleteShiftUseCase
  ) {}

  async Register(req: InputData<RequestShiftJson>, res: Response<ResponseRegisteredShiftJson>): Promise<void> {
    const response = await this.registerShiftUseCase.Execute(req);

    res.status(201).json(response);
  }

  async Filter(req: InputData<RequestFilterShiftJson>, res: Response<ResponseShiftJson[] | null>): Promise<void> {
    const response = await this.filterShiftUseCase.Execute(req);

    res.status(200).json(response);
  }

  async GetById(req: InputData<any>, res: Response<ResponseShiftJson>): Promise<void> {
    const response = await this.getByIdShiftUseCase.Execute(req);

    res.status(200).json(response);
  }

  async Update(req: InputData<RequestShiftJson>, res: Response<null>): Promise<void> {
    await this.updateShiftUseCase.Execute(req);

    res.status(204).send();
  }

  async Delete(req: InputData<any>, res: Response<null>): Promise<void> {
    await this.deleteShiftUseCase.Execute(req);

    res.status(204).send();
  }
}
