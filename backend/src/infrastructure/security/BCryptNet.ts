import type { IPasswordEncripter } from "../../domain/security/Cryptography/IPasswordEncripter.js";
import bcrypt from "bcrypt";

export class BCryptNet implements IPasswordEncripter {
  Encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(12);

    return bcrypt.hashSync(password, salt);
  }

  IsValid(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash);
  }
}
