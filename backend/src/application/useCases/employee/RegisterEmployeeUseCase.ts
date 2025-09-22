import { inject, injectable } from "tsyringe";
import type { RequestRegisterEmployeeJson } from "../../../shared/communication/Requests/RequestRegisterEmployeeJson.js";
import { ResponseRegisteredEmployeeJson } from "../../../shared/communication/Responses/ResponseRegisteredEmployeeJson.js";
import type { IRegisterEmployeeUseCase } from "./IRegisterEmployeeUseCase.js";
import type { InputData } from "../../../shared/communication/types/Request.js";
import type { IEmployeeReadOnlyRepository } from "../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type { IEmployeeWriteOnlyRepository } from "../../../domain/repositories/Employee/IEmployeeWriteOnlyRepository.js";
import type { IEmployee } from "../../../infrastructure/entities/IEmployee.js";
import { RegisterEmployeeValidator } from "./RegisterEmployeeValidator.js";
import { LoggedUser } from "../../../infrastructure/services/LoggedUser.js";

@injectable()
export default class RegisterEmployeeUseCase implements IRegisterEmployeeUseCase {
  constructor(
    @inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository,
    @inject("IEmployeeWriteOnlyRepository") private readonly writeOnlyRepository: IEmployeeWriteOnlyRepository
  ) {}

  async Execute(req: InputData<RequestRegisterEmployeeJson>): Promise<ResponseRegisteredEmployeeJson> {
    // Valida os dados enviados
    const employee = await this.Validate(req);

    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    employee.adm = user._id!;

    // Cria o funcionário no banco de dados
    const newEmployee = await this.writeOnlyRepository.Add(employee);

    const response = new ResponseRegisteredEmployeeJson();

    response.Id = newEmployee._id!.toString();
    response.Name = newEmployee.name;

    return response;
  }

  private async Validate(req: InputData<RequestRegisterEmployeeJson>): Promise<IEmployee> {
    const employee = RegisterEmployeeValidator.Validate(req);

    const employeeExist = await this.readOnlyRepository.ExistActiveEmployeeWithName(employee.name);
    if (employeeExist) {
      throw new Error("Colaborador já cadastrado.");
    }

    return employee;
  }
}
