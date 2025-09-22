import type { ILoggedUser } from "../../domain/services/ILoggedUser.js";
import type { IUser } from "../entities/IUser.js";
import User from "../../domain/entities/User.js";
import { TokenHandler } from "../security/Tokens/TokenHandler.js";
import type { InputData } from "../../shared/communication/types/Request.js";

const tokenHandler = new TokenHandler();

export class LoggedUser implements ILoggedUser {
  private readonly _req: InputData<any>;
  constructor(req: InputData<any>) {
    this._req = req;
  }

  async User(): Promise<IUser> {
    const token = tokenHandler.Value(this._req);

    const userId = tokenHandler.Verify(token);

    const user = await User.findById(userId.id).where("active", true).exec();

    return user!;
  }
}
