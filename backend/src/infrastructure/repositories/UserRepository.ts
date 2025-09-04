import type { HydratedDocument } from "mongoose";
import type { IUser } from "../../domain/entities/IUser.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import User from "../../domain/entities/User.js";

export class UserRepository implements IUserRepository {
  // Cria um novo usuário
  async create(user: IUser): Promise<HydratedDocument<IUser>> {
    const newUser = new User(user);
    const savedUser = await newUser.save();

    return savedUser;
  }

  // Encontra usuário pelo e-mail
  async findByEmail(email: string): Promise<HydratedDocument<IUser> | null> {
    const user = await User.findOne({ email });

    return user;
  }

  // Encontra usuário pelo Id
  async findById(
    id: string | undefined | null
  ): Promise<HydratedDocument<IUser> | null> {
    const user = await User.findById(id).select("-password");

    return user;
  }

  // Atualiza um usuário
  async update(
    id: string,
    updatedData: Partial<IUser>
  ): Promise<HydratedDocument<IUser>> {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );

    return user!;
  }
}
