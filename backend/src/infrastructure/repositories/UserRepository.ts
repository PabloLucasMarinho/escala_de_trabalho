import type { IUserReadOnlyRepository } from "../../domain/repositories/user/IUserReadOnlyRepository.js";
import type { IUserWriteOnlyRepository } from "../../domain/repositories/user/IUserWriteOnlyRepository.js";
import type { IUserUpdateOnlyRepository } from "../../domain/repositories/user/IUserUpdateOnlyRepository.js";
import type { IUser } from "../entities/IUser.js";
import User from "../../domain/entities/User.js";
import type { Types } from "mongoose";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserReadOnlyRepository, IUserWriteOnlyRepository, IUserUpdateOnlyRepository {
  async Add(user: IUser): Promise<Types.ObjectId> {
    const newUser = await new User(user).save();

    return newUser._id;
  }

  async ExistActiveUserWithEmail(email: string): Promise<boolean> {
    const user = await User.exists({ email: email, active: true });

    return user ? true : false;
  }

  async ExistActiveUserWithId(id: string): Promise<boolean> {
    const user = await User.exists({ id: id, active: true });

    return user ? true : false;
  }

  async GetByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email }).where("active", true).exec();
    if (!user) {
      throw new Error("Não existe usuário cadastrado com esse e-mail.");
    }

    return user;
  }

  async GetById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Usuário não existe.");
    }

    return user;
  }

  async Update(user: Partial<IUser>, id: string): Promise<void> {
    await User.findByIdAndUpdate({ _id: id }, { $set: user }, { new: true });
  }
}
