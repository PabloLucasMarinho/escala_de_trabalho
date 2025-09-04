import type { HydratedDocument } from "mongoose";
import type { IRegisterUserDTO } from "../../../shared/communication/dtos/user/IRegisterUserDTO.js";
import type { IUser } from "../../../domain/entities/IUser.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import type { IPasswordService } from "../../../domain/services/IPasswordService.js";

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(data: IRegisterUserDTO): Promise<HydratedDocument<IUser>> {
    // Verifica se o usuário já existe
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error("Já existe uma conta cadastrada com esse e-mail.");
    }

    // Cria senha com hash
    const passwordHash = await this.passwordService.create(data.password);

    // Persiste os dados através do repositório
    const newUser = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return newUser;
  }
}
