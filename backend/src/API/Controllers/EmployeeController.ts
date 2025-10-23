import { inject, injectable } from "tsyringe";
import type { InputData } from "../../shared/communication/types/InputData.js";
import type { Response } from "express";
import type RequestEmployeeJson from "../../shared/communication/Requests/RequestEmployeeJson.js";
import type ResponseEmployeeJson from "../../shared/communication/Responses/ResponseEmployeeJson.js";
import RegisterEmployeeUseCase from "../../application/useCases/employee/Register/RegisterEmployeeUseCase.js";
import GetAllEmployeeUseCase from "../../application/useCases/employee/GetAll/GetAllEmployeeUseCase.js";
import GetByIdEmployeeUseCase from "../../application/useCases/employee/GetById/GetByIdEmployeeUseCase.js";
import UpdateEmployeeUseCase from "../../application/useCases/employee/Update/UpdateEmployeeUseCase.js";
import DeleteEmployeeUseCase from "../../application/useCases/employee/Delete/DeleteEmployeeUseCase.js";

@injectable()
export default class EmployeeController {
  constructor(
    @inject(RegisterEmployeeUseCase) private registerEmployeeUseCase: RegisterEmployeeUseCase,
    @inject(GetAllEmployeeUseCase) private getAllEmployeeUseCase: GetAllEmployeeUseCase,
    @inject(GetByIdEmployeeUseCase) private getByIdEmployeeUseCase: GetByIdEmployeeUseCase,
    @inject(UpdateEmployeeUseCase) private updateEmployeeUseCase: UpdateEmployeeUseCase,
    @inject(DeleteEmployeeUseCase) private deleteEmployeeUseCase: DeleteEmployeeUseCase
  ) {}
  async Register(req: InputData<RequestEmployeeJson>, res: Response<string>): Promise<void> {
    await this.registerEmployeeUseCase.Execute(req);

    res.status(201).json("Cadastro realizado com sucesso.");
  }

  async GetAll(_req: InputData<null>, res: Response<ResponseEmployeeJson[] | null>): Promise<void> {
    const response = await this.getAllEmployeeUseCase.Execute();

    res.status(200).json(response);
  }

  async GetById(req: InputData<null>, res: Response<ResponseEmployeeJson>): Promise<void> {
    const response = await this.getByIdEmployeeUseCase.Execute(req);

    res.status(200).json(response);
  }

  async Update(req: InputData<RequestEmployeeJson>, res: Response<null>): Promise<void> {
    await this.updateEmployeeUseCase.Execute(req);

    res.status(204).send();
  }

  async Delete(req: InputData<null>, res: Response<null>): Promise<void> {
    await this.deleteEmployeeUseCase.Execute(req);

    res.status(204).send();
  }
}
