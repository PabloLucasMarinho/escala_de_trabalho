import type { HydratedDocument } from "mongoose";
import type { IUser } from "../entities/IUser.js";
import type { IUpdateUserDTO } from "../../shared/communication/dtos/user/IUpdateUserDTO.js";
import type { IRegisterUserDTO } from "../../shared/communication/dtos/user/IRegisterUserDTO.js";

export interface IUserRepository {
  // Cria um novo usuário
  create(user: IRegisterUserDTO): Promise<HydratedDocument<IUser>>;

  // Encontra usuário pelo e-mail
  findByEmail(email: string): Promise<HydratedDocument<IUser> | null>;

  // Encontra usuário pelo Id
  findById(
    id: string | undefined | null
  ): Promise<HydratedDocument<IUser> | null>;

  // Atualiza um usuário
  update(
    id: string,
    updatedData: IUpdateUserDTO
  ): Promise<HydratedDocument<IUser>>;
}
