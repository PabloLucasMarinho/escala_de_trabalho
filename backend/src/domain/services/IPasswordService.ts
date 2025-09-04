export interface IPasswordService {
  create(password: string): Promise<string>;

  compare(inputPassword: string, userPassword: string): Promise<boolean>;
}
