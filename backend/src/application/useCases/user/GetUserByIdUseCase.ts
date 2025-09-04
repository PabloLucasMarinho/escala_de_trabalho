import type { IUser } from "../../../domain/entities/IUser.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string | undefined
  ): Promise<Omit<IUser, "password"> | null> {
    //
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }
}
