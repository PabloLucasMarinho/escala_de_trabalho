import { inject, injectable } from "tsyringe";
import type RequestEmployeeJson from "../../../../shared/communication/Requests/RequestEmployeeJson.js";
import ResponseRegisteredEmployeeJson from "../../../../shared/communication/Responses/ResponseRegisteredEmployeeJson.js";
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

  async Execute(req: InputData<RequestEmployeeJson>): Promise<ResponseRegisteredEmployeeJson> {
    // Valida os dados enviados
    const employee = await this.Validate(req);

    const user = await checkLoggedUser(req);

    employee.adm = user._id!;

    // Cria o funcionário no banco de dados
    const newEmployee = await this.writeOnlyRepository.Add(employee);

    const response = new ResponseRegisteredEmployeeJson();

    response.id = newEmployee._id!.toString();
    response.name = newEmployee.name;

    return response;
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
