import type IEmployee from "../../../infrastructure/entities/IEmployee.js";

export default interface IEmployeeUpdateOnlyRepository {
  Update(employee: IEmployee): Promise<void>;
}
