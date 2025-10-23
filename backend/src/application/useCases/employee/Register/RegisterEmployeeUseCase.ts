import { inject, injectable } from "tsyringe";
import type RequestEmployeeJson from "../../../../shared/communication/Requests/RequestEmployeeJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IRegisterEmployeeUseCase from "./IRegisterEmployeeUseCase.js";
import type IEmployeeReadOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type IEmployeeWriteOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeWriteOnlyRepository.js";
import type IEmployee from "../../../../infrastructure/entities/IEmployee.js";
import EmployeeValidator from "../EmployeeValidator.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

@injectable()
export default class RegisterEmployeeUseCase implements IRegisterEmployeeUseCase {
  constructor(
    @inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository,
    @inject("IEmployeeWriteOnlyRepository") private readonly writeOnlyRepository: IEmployeeWriteOnlyRepository
  ) {}

  async Execute(req: InputData<RequestEmployeeJson>): Promise<void> {
    // Valida os dados enviados
    const employee = await this.Validate(req);

    const user = await checkLoggedUser(req);
    if (!user || !user._id) {
      throw new Error("Você precisa estar logado para cadastrar um funcionário.");
    }

    employee.createdBy = user._id;
    employee.updatedBy = user._id;

    await this.writeOnlyRepository.Add(employee);
  }

  private async Validate(req: InputData<RequestEmployeeJson>): Promise<IEmployee> {
    const employee = EmployeeValidator.Validate(req);

    const employeeExist = await this.readOnlyRepository.ExistActiveEmployeeWithName(employee.name);
    if (employeeExist) {
      throw new Error("Colaborador já cadastrado.");
    }

    return employee;
  }
}
