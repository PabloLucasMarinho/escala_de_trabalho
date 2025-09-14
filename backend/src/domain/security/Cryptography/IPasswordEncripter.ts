export interface IPasswordEncripter {
  Encrypt(password: string): string;

  IsValid(password: string, passwordHash: string): boolean;
}
