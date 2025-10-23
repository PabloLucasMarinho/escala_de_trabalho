import { injectable } from "tsyringe";
import type IEmployeeWriteOnlyRepository from "../../domain/repositories/Employee/IEmployeeWriteOnlyRepository.js";
import type IEmployeeReadOnlyRepository from "../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type IEmployeeUpdateOnlyRepository from "../../domain/repositories/Employee/IEmployeeUpdateOnlyRepository.js";
import type IEmployeeDeleteOnlyRepository from "../../domain/repositories/Employee/IEmployeeDeleteOnlyRepository.js";
import Employee from "../../domain/entities/Employee.js";
import type IEmployee from "../entities/IEmployee.js";
import type IUser from "../entities/IUser.js";

@injectable()
export default class EmployeeRepository
  implements
    IEmployeeReadOnlyRepository,
    IEmployeeWriteOnlyRepository,
    IEmployeeUpdateOnlyRepository,
    IEmployeeDeleteOnlyRepository
{
  async Add(employee: IEmployee): Promise<IEmployee> {
    const newEmployee = await new Employee(employee).save();

    return newEmployee;
  }

  async ExistActiveEmployeeWithName(name: string): Promise<boolean> {
    const employee = await Employee.findOne({ name: name, active: true });

    return employee ? true : false;
  }

  async GetAll(): Promise<IEmployee[] | null> {
    const query: any = { active: true };

    const employees = await Employee.find(query).exec();

    return employees;
  }

  async GetById(employeeId: string): Promise<IEmployee | null> {
    const query = { _id: employeeId };

    const employee = await Employee.findOne(query);

    return employee;
  }

  async Update(employee: IEmployee): Promise<void> {
    await Employee.findByIdAndUpdate({ _id: employee._id }, { $set: employee }, { new: true });
  }

  async Delete(employee: IEmployee): Promise<void> {
    await Employee.findByIdAndDelete(employee._id);
  }
}
