import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IDeleteEmployeeUseCase from "./IDeleteEmployeeUseCase.js";
import type IEmployeeReadOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type IEmployeeDeleteOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeDeleteOnlyRepository.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

@injectable()
export default class DeleteEmployeeUseCase implements IDeleteEmployeeUseCase {
  constructor(
    @inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository,
    @inject("IEmployeeDeleteOnlyRepository") private readonly deleteOnlyRepository: IEmployeeDeleteOnlyRepository
  ) {}

  async Execute(req: InputData<null>): Promise<void> {
    const paramsId = checkParamsId(req.params.id);

    const user = await checkLoggedUser(req);

    const employee = await this.readOnlyRepository.GetById(paramsId);

    if (!employee) {
      throw new Error("Colaborador não existe.");
    }

    await this.deleteOnlyRepository.Delete(employee);
  }
}
