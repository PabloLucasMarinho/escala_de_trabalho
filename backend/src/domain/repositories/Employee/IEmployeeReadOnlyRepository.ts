import type IEmployee from "../../../infrastructure/entities/IEmployee.js";
import type IUser from "../../../infrastructure/entities/IUser.js";

export default interface IEmployeeReadOnlyRepository {
  ExistActiveEmployeeWithName(name: string): Promise<boolean>;
  GetById(user: IUser, employeeId: string): Promise<IEmployee | null>;
}
