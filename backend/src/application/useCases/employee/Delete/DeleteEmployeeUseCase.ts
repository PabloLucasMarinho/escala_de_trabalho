import { inject, injectable } from "tsyringe";
import type { IDeleteEmployeeUseCase } from "./IDeleteEmployeeUseCase.js";
import type { Request } from "express";
import { LoggedUser } from "../../../../infrastructure/services/LoggedUser.js";
import type { IEmployeeReadOnlyRepository } from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type { IEmployeeDeleteOnlyRepository } from "../../../../domain/repositories/Employee/IEmployeeDeleteOnlyRepository.js";

@injectable()
export class DeleteEmployeeUseCase implements IDeleteEmployeeUseCase {
  constructor(
    @inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository,
    @inject("IEmployeeDeleteOnlyRepository") private readonly deleteOnlyRepository: IEmployeeDeleteOnlyRepository
  ) {}

  async Execute(req: Request): Promise<void> {
    if (!req.params.id) {
      throw new Error("Colaborador não existe.");
    }
    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    const employee = await this.readOnlyRepository.GetById(user, req.params.id);

    if (!employee) {
      throw new Error("Colaborador não existe.");
    }

    await this.deleteOnlyRepository.Delete(employee);
  }
}
