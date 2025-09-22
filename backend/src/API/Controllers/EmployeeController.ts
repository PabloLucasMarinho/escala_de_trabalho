import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import type { RequestEmployeeJson } from "../../shared/communication/Requests/RequestEmployeeJson.js";
import type { ResponseRegisteredEmployeeJson } from "../../shared/communication/Responses/ResponseRegisteredEmployeeJson.js";
import RegisterEmployeeUseCase from "../../application/useCases/employee/Register/RegisterEmployeeUseCase.js";
import type { InputData } from "../../shared/communication/types/Request.js";
import GetByIdEmployeeUseCase from "../../application/useCases/employee/GetById/GetByIdEmployeeUseCase.js";
import UpdateEmployeeUseCase from "../../application/useCases/employee/Update/UpdateEmployeeUseCase.js";
import { DeleteEmployeeUseCase } from "../../application/useCases/employee/Delete/DeleteEmployeeUseCase.js";

@injectable()
export default class EmployeeController {
  constructor(
    @inject(RegisterEmployeeUseCase) private registerEmployeeUseCase: RegisterEmployeeUseCase,
    @inject(GetByIdEmployeeUseCase) private getByIdEmployeeUseCase: GetByIdEmployeeUseCase,
    @inject(UpdateEmployeeUseCase) private updateEmployeeUseCase: UpdateEmployeeUseCase,
    @inject(DeleteEmployeeUseCase) private deleteEmployeeUseCase: DeleteEmployeeUseCase
  ) {}
  async Register(req: InputData<RequestEmployeeJson>, res: Response<ResponseRegisteredEmployeeJson>): Promise<void> {
    // Executa o caso de uso
    const response = await this.registerEmployeeUseCase.Execute(req);

    // Devolve o status code e resposta
    res.status(201).json(response);
  }

  async GetById(req: Request, res: Response): Promise<void> {
    const response = await this.getByIdEmployeeUseCase.Execute(req);

    res.status(200).json(response);
  }

  async Update(req: InputData<RequestEmployeeJson>, res: Response): Promise<void> {
    await this.updateEmployeeUseCase.Execute(req);

    res.status(204).send();
  }

  async Delete(req: Request, res: Response): Promise<void> {
    await this.deleteEmployeeUseCase.Execute(req);

    res.status(204).send();
  }
}
