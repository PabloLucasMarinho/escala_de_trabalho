import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IRegisterWorkplaceUseCase from "./IRegisterWorkplaceUseCase.js";
import type RequestWorkplaceJson from "../../../../shared/communication/Requests/RequestWorkplaceJson.js";
import type IWorkplace from "../../../../infrastructure/entities/IWorkplace.js";
import WorkplaceValidator from "../WorkplaceValidator.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceWriteOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceWriteOnlyRepository.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";
import { NameFormatter } from "../../../Services/NameFormatter.js";

@injectable()
export default class RegisterWorkplaceUseCase implements IRegisterWorkplaceUseCase {
  constructor(
    @inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepository: IWorkplaceReadOnlyRepository,
    @inject("IWorkplaceWriteOnlyRepository") private readonly writeOnlyRepository: IWorkplaceWriteOnlyRepository
  ) {}

  async Execute(req: InputData<RequestWorkplaceJson>): Promise<void> {
    const workplace = await this.Validate(req);

    const user = await checkLoggedUser(req);
    if (!user || !user._id) {
      throw new Error("Você precisa estar logado para cadastrar um local de trabalho.");
    }

    workplace.createdBy = user._id;
    workplace.updatedBy = user._id;

    await this.writeOnlyRepository.Add(workplace);
  }

  private async Validate(req: InputData<RequestWorkplaceJson>): Promise<IWorkplace> {
    const workplace = WorkplaceValidator.Validate(req);

    const workplaceExist = await this.readOnlyRepository.ExistActiveWorkplaceWithName(workplace.name);
    if (workplaceExist) {
      throw new Error("Local de Trabalho já cadastrado.");
    }

    return workplace;
  }
}
