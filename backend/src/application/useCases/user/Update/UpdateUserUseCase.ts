import type { Request } from "express";
import type { IUpdateUserUseCase } from "./IUpdateUserUseCase.js";
import { UpdateUserValidator } from "./UpdateUserValidator.js";
import { inject, injectable } from "tsyringe";
import type { IUserReadOnlyRepository } from "../../../../domain/repositories/user/IUserReadOnlyRepository.js";
import { LoggedUser } from "../../../../infrastructure/services/LoggedUser.js";
import type { IUserUpdateOnlyRepository } from "../../../../domain/repositories/user/IUserUpdateOnlyRepository.js";

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @inject("IUserReadOnlyRepository")
    private readonly readOnlyRepository: IUserReadOnlyRepository,
    @inject("IUserUpdateOnlyRepository")
    private readonly updateOnlyRepository: IUserUpdateOnlyRepository
  ) {}

  async Execute(req: Request): Promise<void> {
    if (!req.user) {
      throw new Error("Usuário não existe.");
    }

    const loggedUser = new LoggedUser(req);
    const user = await loggedUser.User();

    // Valida os dados enviados
    await this.Validate(req, user.email);

    const dbUser = await this.updateOnlyRepository.GetById(req.user.toString());

    if (req.body.name && req.body.name.length > 0) {
      dbUser.name = req.body.name;
    }

    if (req.body.email && req.body.email.length > 0) {
      dbUser.email = req.body.email;
    }

    this.updateOnlyRepository.Update(dbUser, user._id!.toString());
  }

  private async Validate(req: Request, currentEmail: string): Promise<void> {
    const user = UpdateUserValidator.Validate(req);

    if (currentEmail !== user.email) {
      const emailExist = await this.readOnlyRepository.ExistActiveUserWithEmail(
        user.email!
      );

      if (emailExist) {
        throw new Error("E-mail já cadastrado por outro usuário.");
      }
    }
  }
}
