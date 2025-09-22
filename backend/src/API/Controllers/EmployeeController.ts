import type { Response } from "express";
import { inject, injectable } from "tsyringe";
import type { RequestRegisterEmployeeJson } from "../../shared/communication/Requests/RequestRegisterEmployeeJson.js";
import type { ResponseRegisteredEmployeeJson } from "../../shared/communication/Responses/ResponseRegisteredEmployeeJson.js";
import RegisterEmployeeUseCase from "../../application/useCases/employee/RegisterEmployeeUseCase.js";
import type { InputData } from "../../shared/communication/types/Request.js";

@injectable()
export default class EmployeeController {
  constructor(@inject(RegisterEmployeeUseCase) private registerEmployeeUseCase: RegisterEmployeeUseCase) {}
  async Register(req: InputData<RequestRegisterEmployeeJson>, res: Response<ResponseRegisteredEmployeeJson>): Promise<void> {
    // Executa o caso de uso
    const response = await this.registerEmployeeUseCase.Execute(req);

    // Devolve o status code e resposta
    res.status(201).json(response);
  }
}
