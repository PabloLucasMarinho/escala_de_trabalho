import { inject, injectable } from "tsyringe";
import LoggedUser from "../../../../infrastructure/services/LoggedUser.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IDeleteWorkplaceUseCase from "./IDeleteWorkplaceUseCase.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceDeleteOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceDeleteOnlyRepository.js";

@injectable()
export default class DeleteWorkplaceUseCase implements IDeleteWorkplaceUseCase {
  constructor(
    @inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepsitory: IWorkplaceReadOnlyRepository,
    @inject("IWorkplaceDeleteOnlyRepository") private readonly deleteOnlyRepository: IWorkplaceDeleteOnlyRepository
  ) {}

  async Execute(req: InputData<any>): Promise<void> {
    if (!req.params.id) {
      throw new Error("Colaborador não existe.");
    }

    const loggedUser = new LoggedUser(req);
    const user = await loggedUser.User();

    const workplace = await this.readOnlyRepsitory.GetById(user, req.params.id);

    if (!workplace) {
      throw new Error("Colaborador não existe.");
    }

    await this.deleteOnlyRepository.Delete(workplace);
  }
}
