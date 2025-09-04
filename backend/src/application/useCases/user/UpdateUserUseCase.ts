import type { HydratedDocument } from "mongoose";
import type { IUpdateUserDTO } from "../../../shared/communication/dtos/user/IUpdateUserDTO.js";
import type { IUser } from "../../../domain/entities/IUser.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import type { IPasswordService } from "../../../domain/services/IPasswordService.js";

export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(
    data: IUpdateUserDTO,
    userId: string
  ): Promise<HydratedDocument<IUser>> {
    const { name, email, password, confirmPassword } = data;

    if (!name) {
      // Garante que o nome não seja atualizado com null ou undefined
      delete data.name;
    }

    if (email) {
      // Verifica se o e-mail já está em uso por outro usuário
      const user = await this.userRepository.findByEmail(email);

      if (user && user.id !== userId) {
        throw new Error("Já existe um usuário cadastrado com esse e-mail.");
      }
    } else {
      // Garante que o e-mail não seja atualizado com null ou undefined
      delete data.email;
    }

    if (password && password === confirmPassword) {
      const passwordHash = await this.passwordService.create(password);
      data.password = passwordHash;
    } else {
      // Garante que a senha não seja atualizada com null ou undefined
      delete data.password;
    }

    // Persiste a atualização dos dados através do repositório
    const updatedUser = await this.userRepository.update(userId, data);

    return updatedUser;
  }
}
