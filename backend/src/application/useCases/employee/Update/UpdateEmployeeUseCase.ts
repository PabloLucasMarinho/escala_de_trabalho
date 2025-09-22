import { inject, injectable } from "tsyringe";
import type { IUpdateEmployeeUseCase } from "./IUpdateEmployeeUseCase.js";
import type { IEmployeeUpdateOnlyRepository } from "../../../../domain/repositories/Employee/IEmployeeUpdateOnlyRepository.js";
import type { Request } from "express";
import { EmployeeValidator } from "../EmployeeValidator.js";
import { LoggedUser } from "../../../../infrastructure/services/LoggedUser.js";
import type { IEmployeeReadOnlyRepository } from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type { InputData } from "../../../../shared/communication/types/Request.js";
import type { RequestEmployeeJson } from "../../../../shared/communication/Requests/RequestEmployeeJson.js";

@injectable()
export default class UpdateEmployeeUseCase implements IUpdateEmployeeUseCase {
  constructor(
    @inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository,
    @inject("IEmployeeUpdateOnlyRepository") private readonly updateOnlyRepository: IEmployeeUpdateOnlyRepository
  ) {}
  async Execute(req: InputData<RequestEmployeeJson>): Promise<void> {
    if (!req.params.id) {
      throw new Error("Colaborador não existe.");
    }

    this.Validator(req);

    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    const employee = await this.readOnlyRepository.GetById(user, req.params.id);

    if (!employee) {
      throw new Error("Colaborador não existe.");
    }

    employee.name = req.body.name;

    await this.updateOnlyRepository.Update(employee);
  }

  private Validator(req: InputData<RequestEmployeeJson>) {
    EmployeeValidator.Validate(req);
  }
}
