import type { IGetByIdEmployeeUseCase } from "./IGetByIdEmployeeUseCase.js";
import type { Request } from "express";
import { ResponseEmployeeJson } from "../../../../shared/communication/Responses/ResponseEmployeeJson.js";
import { LoggedUser } from "../../../../infrastructure/services/LoggedUser.js";
import { inject, injectable } from "tsyringe";
import type { IEmployeeReadOnlyRepository } from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";

@injectable()
export default class GetByIdEmployeeUseCase implements IGetByIdEmployeeUseCase {
  constructor(@inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository) {}

  async Execute(req: Request): Promise<ResponseEmployeeJson> {
    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    if (!req.params.id) {
      throw new Error("ID não informado.");
    }

    const employee = await this.readOnlyRepository.GetById(user, req.params.id);

    if (!employee) {
      throw new Error("Colaborador não encontrado.");
    }

    const response = new ResponseEmployeeJson();

    response.name = employee.name;

    return response;
  }
}
