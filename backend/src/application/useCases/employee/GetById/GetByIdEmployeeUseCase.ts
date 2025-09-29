import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IGetByIdEmployeeUseCase from "./IGetByIdEmployeeUseCase.js";
import type IEmployeeReadOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import ResponseEmployeeJson from "../../../../shared/communication/Responses/ResponseEmployeeJson.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

@injectable()
export default class GetByIdEmployeeUseCase implements IGetByIdEmployeeUseCase {
  constructor(@inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository) {}

  async Execute(req: InputData<null>): Promise<ResponseEmployeeJson> {
    const paramsId = checkParamsId(req.params.id);
    const user = await checkLoggedUser(req);

    if (!req.params.id) {
      throw new Error("ID não informado.");
    }

    const employee = await this.readOnlyRepository.GetById(user, paramsId);

    if (!employee) {
      throw new Error("Colaborador não encontrado.");
    }

    const response = new ResponseEmployeeJson();

    response.name = employee.name;

    return response;
  }
}
