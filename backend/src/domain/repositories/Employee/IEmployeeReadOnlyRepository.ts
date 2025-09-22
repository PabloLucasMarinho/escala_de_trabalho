import type { IEmployee } from "../../../infrastructure/entities/IEmployee.js";
import type { IUser } from "../../../infrastructure/entities/IUser.js";
import type { RequestRegisterEmployeeJson } from "../../../shared/communication/Requests/RequestRegisterEmployeeJson.js";
import type { InputData } from "../../../shared/communication/types/Request.js";

export interface IEmployeeReadOnlyRepository {
  ExistActiveEmployeeWithName(name: string): Promise<boolean>;
  GetById(user: IUser, employeeId: string): Promise<IEmployee | null>;
}
