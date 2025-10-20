import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IChangePasswordUseCase from "./IChangePasswordUseCase.js";
import type IUser from "../../../../infrastructure/entities/IUser.js";
import ChangePasswordValidator from "./ChangePasswordValidator.js";
import type IPasswordEncripter from "../../../../domain/security/Cryptography/IPasswordEncripter.js";
import type IUserUpdateOnlyRepository from "../../../../domain/repositories/user/IUserUpdateOnlyRepository.js";
import type RequestChangePasswordJson from "../../../../shared/communication/Requests/RequestChangePasswordJson.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

@injectable()
export default class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    @inject("IPasswordEncripter")
    private readonly passwordEncripter: IPasswordEncripter,
    @inject("IUserUpdateOnlyRepository")
    private readonly updateOnlyRepository: IUserUpdateOnlyRepository
  ) {}
  async Execute(req: InputData<RequestChangePasswordJson>): Promise<void> {
    const user = await checkLoggedUser(req);

    this.Validate(req, user);

    const dbUser = await this.updateOnlyRepository.GetById(user._id!.toString());

    dbUser.password = this.passwordEncripter.Encrypt(req.body.newPassword);

    this.updateOnlyRepository.Update(dbUser, dbUser._id!.toString());
  }

  private Validate(req: InputData<RequestChangePasswordJson>, loggedUser: IUser): void {
    ChangePasswordValidator.Validate(req);

    if (!this.passwordEncripter.IsValid(req.body.currentPassword, loggedUser.password)) {
      throw new Error("A senha atual inserida não condiz com a senha salva em sistema.");
    }
  }
}
