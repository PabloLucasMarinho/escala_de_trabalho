import type { IEmployee } from "../../../infrastructure/entities/IEmployee.js";

export interface IEmployeeWriteOnlyRepository {
  Add(employee: IEmployee): Promise<IEmployee>;
}
