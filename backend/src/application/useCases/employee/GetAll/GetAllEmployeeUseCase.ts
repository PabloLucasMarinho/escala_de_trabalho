import { inject, injectable } from "tsyringe";
import type IGetAllEmployeeUseCase from "./IGetAllEmployeeUseCase.js";
import type IEmployeeReadOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import ResponseEmployeeJson from "../../../../shared/communication/Responses/ResponseEmployeeJson.js";

@injectable()
export default class GetAllEmployeeUseCase implements IGetAllEmployeeUseCase {
  constructor(@inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository) {}

  async Execute(): Promise<ResponseEmployeeJson[] | null> {
    const employees = await this.readOnlyRepository.GetAll();

    if (!employees) return null;

    const responses: ResponseEmployeeJson[] = employees.map((employee) => {
      const response: ResponseEmployeeJson = new ResponseEmployeeJson();

      if (!employee._id) throw new Error("ID do colaborador inválido.");

      response.id = employee._id.toString();
      response.name = employee.name;

      return response;
    });

    return responses.length === 0 ? null : responses;
  }
}
