import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IGetByIdEmployeeUseCase from "./IGetByIdEmployeeUseCase.js";
import type IEmployeeReadOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import ResponseEmployeeJson from "../../../../shared/communication/Responses/ResponseEmployeeJson.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";

@injectable()
export default class GetByIdEmployeeUseCase implements IGetByIdEmployeeUseCase {
  constructor(@inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository) {}

  async Execute(req: InputData<null>): Promise<ResponseEmployeeJson> {
    const paramsId = checkParamsId(req.params.id);

    if (!req.params.id) {
      throw new Error("ID não informado.");
    }

    const employee = await this.readOnlyRepository.GetById(paramsId);

    if (!employee || !employee._id) {
      throw new Error("Colaborador não encontrado.");
    }

    const response = new ResponseEmployeeJson();

    response.id = employee._id.toString();
    response.name = employee.name;
    response.createdBy = employee.createdBy?.toString();
    response.updatedBy = employee.updatedBy?.toString();

    return response;
  }
}
