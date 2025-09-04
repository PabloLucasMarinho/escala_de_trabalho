import type { HydratedDocument } from "mongoose";
import type { ILoginUserDTO } from "../../../shared/communication/dtos/user/ILoginUserDTO.js";
import type { IUser } from "../../../domain/entities/IUser.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import type { IPasswordService } from "../../../domain/services/IPasswordService.js";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(data: ILoginUserDTO): Promise<HydratedDocument<IUser>> {
    // Verifica se o usuário não existe
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("E-mail ou senha inválidos.");
    }

    // Compara as senhas
    const checkPassword = await this.passwordService.compare(
      data.password,
      user.password
    );
    if (!checkPassword) {
      throw new Error("E-mail ou senha inválidos.");
    }

    return user;
  }
}
