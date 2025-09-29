import { inject, injectable } from "tsyringe";
import type { Response } from "express";
import type { InputData } from "../../shared/communication/types/InputData.js";
import type RequestWorkplaceJson from "../../shared/communication/Requests/RequestWorkplaceJson.js";
import type ResponseRegisteredWorkplaceJson from "../../shared/communication/Responses/ResponseRegisteredWorkplaceJson.js";
import type ResponseWorkplaceJson from "../../shared/communication/Responses/ResponseWorkplaceJson.js";
import RegisterWorkplaceUseCase from "../../application/useCases/workplace/Register/RegisterWorkplaceUseCase.js";
import GetByIdWorkplaceUseCase from "../../application/useCases/workplace/GetById/GetByIdWorkplaceUseCase.js";
import UpdateWorkplaceUseCase from "../../application/useCases/workplace/Update/UpdateWorkplaceUseCase.js";
import DeleteWorkplaceUseCase from "../../application/useCases/workplace/Delete/DeleteWorkplaceUseCase.js";

@injectable()
export default class WorkplaceController {
  constructor(
    @inject(RegisterWorkplaceUseCase) private registerWorkplaceUseCase: RegisterWorkplaceUseCase,
    @inject(GetByIdWorkplaceUseCase) private getByIdWorkplaceUseCase: GetByIdWorkplaceUseCase,
    @inject(UpdateWorkplaceUseCase) private updateWorkplaceUseCase: UpdateWorkplaceUseCase,
    @inject(DeleteWorkplaceUseCase) private deleteWorkplaceUseCase: DeleteWorkplaceUseCase
  ) {}

  async Register(req: InputData<RequestWorkplaceJson>, res: Response<ResponseRegisteredWorkplaceJson>): Promise<void> {
    const response = await this.registerWorkplaceUseCase.Execute(req);

    res.status(201).json(response);
  }

  async GetById(req: InputData<null>, res: Response<ResponseWorkplaceJson>): Promise<void> {
    const response = await this.getByIdWorkplaceUseCase.Execute(req);

    res.status(200).json(response);
  }

  async Update(req: InputData<RequestWorkplaceJson>, res: Response<null>): Promise<void> {
    await this.updateWorkplaceUseCase.Execute(req);

    res.status(204).send();
  }

  async Delete(req: InputData<null>, res: Response<null>): Promise<void> {
    await this.deleteWorkplaceUseCase.Execute(req);

    res.status(204).send();
  }
}
