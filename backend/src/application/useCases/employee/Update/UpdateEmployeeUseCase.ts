import { inject, injectable } from "tsyringe";
import type IUpdateEmployeeUseCase from "./IUpdateEmployeeUseCase.js";
import type IEmployeeUpdateOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeUpdateOnlyRepository.js";
import EmployeeValidator from "../EmployeeValidator.js";
import type IEmployeeReadOnlyRepository from "../../../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestEmployeeJson from "../../../../shared/communication/Requests/RequestEmployeeJson.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";
import { NameFormatter } from "../../../Services/NameFormatter.js";

@injectable()
export default class UpdateEmployeeUseCase implements IUpdateEmployeeUseCase {
  constructor(
    @inject("IEmployeeReadOnlyRepository") private readonly readOnlyRepository: IEmployeeReadOnlyRepository,
    @inject("IEmployeeUpdateOnlyRepository") private readonly updateOnlyRepository: IEmployeeUpdateOnlyRepository
  ) {}
  async Execute(req: InputData<RequestEmployeeJson>): Promise<void> {
    const paramsId = checkParamsId(req.params.id);

    this.Validator(req);

    const user = await checkLoggedUser(req);
    if (!user || !user._id) {
      throw new Error("Você precisa estar logado para atualizar um funcionário.");
    }

    const employee = await this.readOnlyRepository.GetById(paramsId);

    if (!employee) {
      throw new Error("Colaborador não existe.");
    }

    employee.name = NameFormatter(req.body.name);
    employee.updatedBy = user._id;

    await this.updateOnlyRepository.Update(employee);
  }

  private Validator(req: InputData<RequestEmployeeJson>) {
    EmployeeValidator.Validate(req);
  }
}
