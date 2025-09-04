import type { IUser } from "../../../domain/entities/IUser.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import type { IAuthService } from "../../../domain/services/IAuthService.js";

export class GetUserByTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(token: string): Promise<Omit<IUser, "password"> | null> {
    // Decodifica o token e extrai o Id do usuário
    const userId = this.authService.getUserId(token);

    if (!userId) null;

    // Busca o usuário no banco de dados
    const user = await this.userRepository.findById(userId);

    // Se o usuário for encontrado, remove a senha antes de retornar
    if (!user) {
      return null;
    }

    return user;
  }
}
