import type { IPasswordService } from "../../domain/services/IPasswordService.js";
import bcrypt from "bcrypt";

export class PasswordService implements IPasswordService {
  async create(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);

    return await bcrypt.hash(password, salt);
  }

  async compare(inputPassword: string, userPassword: string): Promise<boolean> {
    const checkPassword = await bcrypt.compare(inputPassword, userPassword);

    return checkPassword;
  }
}
