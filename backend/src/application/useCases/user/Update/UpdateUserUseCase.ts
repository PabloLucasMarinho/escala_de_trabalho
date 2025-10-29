import type IUpdateUserUseCase from "./IUpdateUserUseCase.js";
import UpdateUserValidator from "./UpdateUserValidator.js";
import { inject, injectable } from "tsyringe";
import type IUserReadOnlyRepository from "../../../../domain/repositories/user/IUserReadOnlyRepository.js";
import type IUserUpdateOnlyRepository from "../../../../domain/repositories/user/IUserUpdateOnlyRepository.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestUpdateUserJson from "../../../../shared/communication/Requests/RequestUpdateUserJson.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";
import { NameFormatter } from "../../../Services/NameFormatter.js";

@injectable()
export default class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @inject("IUserReadOnlyRepository")
    private readonly readOnlyRepository: IUserReadOnlyRepository,
    @inject("IUserUpdateOnlyRepository")
    private readonly updateOnlyRepository: IUserUpdateOnlyRepository
  ) {}

  async Execute(req: InputData<RequestUpdateUserJson>): Promise<void> {
    const paramsId = checkParamsId(req.params.id);

    const user = await checkLoggedUser(req);
    if (!user || !user._id) {
      throw new Error("Você precisa estar logado para atualizar seu usuário.");
    }

    // Valida os dados enviados
    await this.Validate(req, user.email);

    const dbUser = await this.updateOnlyRepository.GetById(paramsId);

    if (req.body.name && req.body.name.length > 0) {
      dbUser.name = NameFormatter(req.body.name);
    }

    if (req.body.email && req.body.email.length > 0) {
      dbUser.email = req.body.email;
    }

    this.updateOnlyRepository.Update(dbUser, user._id.toString());
  }

  private async Validate(req: InputData<RequestUpdateUserJson>, currentEmail: string): Promise<void> {
    const user = UpdateUserValidator.Validate(req);

    if (currentEmail !== user.email) {
      const emailExist = await this.readOnlyRepository.ExistActiveUserWithEmail(user.email!);

      if (emailExist) {
        throw new Error("E-mail já cadastrado por outro usuário.");
      }
    }
  }
}
