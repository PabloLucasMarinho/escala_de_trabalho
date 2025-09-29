import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IDeleteWorkplaceUseCase from "./IDeleteWorkplaceUseCase.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceDeleteOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceDeleteOnlyRepository.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

@injectable()
export default class DeleteWorkplaceUseCase implements IDeleteWorkplaceUseCase {
  constructor(
    @inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepsitory: IWorkplaceReadOnlyRepository,
    @inject("IWorkplaceDeleteOnlyRepository") private readonly deleteOnlyRepository: IWorkplaceDeleteOnlyRepository
  ) {}

  async Execute(req: InputData<null>): Promise<void> {
    const paramsId = checkParamsId(req.params.id);

    const user = await checkLoggedUser(req);

    const workplace = await this.readOnlyRepsitory.GetById(user, paramsId);

    if (!workplace) {
      throw new Error("Colaborador não existe.");
    }

    await this.deleteOnlyRepository.Delete(workplace);
  }
}
