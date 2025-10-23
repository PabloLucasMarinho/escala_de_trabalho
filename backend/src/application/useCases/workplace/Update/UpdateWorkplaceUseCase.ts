import { inject, injectable } from "tsyringe";
import type IUpdateWorkplaceUseCase from "./IUpdateWorkplaceUseCase.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceUpdateOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceUpdateOnlyRepository.js";
import type RequestWorkplaceJson from "../../../../shared/communication/Requests/RequestWorkplaceJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import WorkplaceValidator from "../WorkplaceValidator.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

@injectable()
export default class UpdateWorkplaceUseCase implements IUpdateWorkplaceUseCase {
  constructor(
    @inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepository: IWorkplaceReadOnlyRepository,
    @inject("IWorkplaceUpdateOnlyRepository") private readonly updateOnlyRepository: IWorkplaceUpdateOnlyRepository
  ) {}

  async Execute(req: InputData<RequestWorkplaceJson>): Promise<void> {
    const paramsId = checkParamsId(req.params.id);

    this.Validator(req);

    const user = await checkLoggedUser(req);
    if (!user || !user._id) {
      throw new Error("Você precisa estar logado para atualizar um local de trabalho.");
    }

    const workplace = await this.readOnlyRepository.GetById(paramsId);

    if (!workplace) {
      throw new Error("Local de Trabalho não existe");
    }

    workplace.name = req.body.name;
    workplace.updatedBy = user._id;

    await this.updateOnlyRepository.Update(workplace);
  }

  private Validator(req: InputData<RequestWorkplaceJson>) {
    WorkplaceValidator.Validate(req);
  }
}
