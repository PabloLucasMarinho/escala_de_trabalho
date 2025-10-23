import type IEmployee from "../../../infrastructure/entities/IEmployee.js";

export default interface IEmployeeReadOnlyRepository {
  ExistActiveEmployeeWithName(name: string): Promise<boolean>;
  GetById(employeeId: string): Promise<IEmployee | null>;
  GetAll(): Promise<IEmployee[] | null>;
}
