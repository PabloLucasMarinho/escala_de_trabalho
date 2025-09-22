import type { IEmployee } from "../../../infrastructure/entities/IEmployee.js";

export interface IEmployeeUpdateOnlyRepository {
  Update(employee: IEmployee): Promise<void>;
}
