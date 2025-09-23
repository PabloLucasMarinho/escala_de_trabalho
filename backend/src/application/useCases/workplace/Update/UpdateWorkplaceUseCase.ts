import { inject, injectable } from "tsyringe";
import type IUpdateWorkplaceUseCase from "./IUpdateWorkplaceUseCase.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceUpdateOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceUpdateOnlyRepository.js";
import type RequestWorkplaceJson from "../../../../shared/communication/Requests/RequestWorkplaceJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import WorkplaceValidator from "../WorkplaceValidator.js";
import LoggedUser from "../../../../infrastructure/services/LoggedUser.js";

@injectable()
export default class UpdateWorkplaceUseCase implements IUpdateWorkplaceUseCase {
  constructor(
    @inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepository: IWorkplaceReadOnlyRepository,
    @inject("IWorkplaceUpdateOnlyRepository") private readonly updateOnlyRepository: IWorkplaceUpdateOnlyRepository
  ) {}

  async Execute(req: InputData<RequestWorkplaceJson>): Promise<void> {
    if (!req.params.id) {
      throw new Error("Colaborador não existe.");
    }

    this.Validator(req);

    const loggedUser = new LoggedUser(req);
    const user = await loggedUser.User();

    const workplace = await this.readOnlyRepository.GetById(user, req.params.id);

    if (!workplace) {
      throw new Error("Local de Trabalho não existe");
    }

    workplace.name = req.body.name;

    await this.updateOnlyRepository.Update(workplace);
  }

  private Validator(req: InputData<RequestWorkplaceJson>) {
    WorkplaceValidator.Validate(req);
  }
}
