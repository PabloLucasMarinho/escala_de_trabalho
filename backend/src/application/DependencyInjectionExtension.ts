import { container } from "tsyringe";
import type IGetUserProfileUseCase from "./useCases/user/Profile/IGetUserProfileUseCase.js";
import GetUserProfileUseCase from "./useCases/user/Profile/GetUserProfileUseCase.js";
import type IRegisterUserUseCase from "./useCases/user/register/IRegisterUserUseCase.js";
import RegisterUserUseCase from "./useCases/user/register/RegisterUserUseCase.js";
import type ILoginUserUseCase from "./useCases/user/Login/ILoginUserUseCase.js";
import LoginUserUseCase from "./useCases/user/Login/LoginUserUseCase.js";
import type IUpdateUserUseCase from "./useCases/user/Update/IUpdateUserUseCase.js";
import UpdateUserUseCase from "./useCases/user/Update/UpdateUserUseCase.js";
import type IChangePasswordUseCase from "./useCases/user/ChangePassword/IChangePasswordUseCase.js";
import ChangePasswordUseCase from "./useCases/user/ChangePassword/ChangePasswordUseCase.js";
import type IRegisterEmployeeUseCase from "./useCases/employee/Register/IRegisterEmployeeUseCase.js";
import RegisterEmployeeUseCase from "./useCases/employee/Register/RegisterEmployeeUseCase.js";
import type IGetByIdEmployeeUseCase from "./useCases/employee/GetById/IGetByIdEmployeeUseCase.js";
import GetByIdEmployeeUseCase from "./useCases/employee/GetById/GetByIdEmployeeUseCase.js";
import type IUpdateEmployeeUseCase from "./useCases/employee/Update/IUpdateEmployeeUseCase.js";
import UpdateEmployeeUseCase from "./useCases/employee/Update/UpdateEmployeeUseCase.js";
import type IDeleteEmployeeUseCase from "./useCases/employee/Delete/IDeleteEmployeeUseCase.js";
import DeleteEmployeeUseCase from "./useCases/employee/Delete/DeleteEmployeeUseCase.js";
import type IRegisterWorkplaceUseCase from "./useCases/workplace/Register/IRegisterWorkplaceUseCase.js";
import RegisterWorkplaceUseCase from "./useCases/workplace/Register/RegisterWorkplaceUseCase.js";
import type IGetByIdWorkplaceUseCase from "./useCases/workplace/GetById/IGetByIdWorkplaceUseCase.js";
import GetByIdWorkplaceUseCase from "./useCases/workplace/GetById/GetByIdWorkplaceUseCase.js";
import type IUpdateWorkplaceUseCase from "./useCases/workplace/Update/IUpdateWorkplaceUseCase.js";
import UpdateWorkplaceUseCase from "./useCases/workplace/Update/UpdateWorkplaceUseCase.js";
import type IRegisterShiftUseCase from "./useCases/shift/Register/IRegisterShiftUseCase.js";
import RegisterShiftUseCase from "./useCases/shift/Register/RegisterShiftUseCase.js";
import type IFilterShiftUseCase from "./useCases/shift/Filter/IFilterShiftUseCase.js";
import FilterShiftUseCase from "./useCases/shift/Filter/FilterShiftUseCase.js";
import type IGetByIdShiftUseCase from "./useCases/shift/GetById/IGetByIdShiftUseCase.js";
import GetByIdShiftUseCase from "./useCases/shift/GetById/GetByIdShiftUseCase.js";
import type IUpdateShiftUseCase from "./useCases/shift/Update/IUpdateShiftUseCase.js";
import UpdateShiftUseCase from "./useCases/shift/Update/UpdateShiftUseCase.js";
import type IDeleteShiftUseCase from "./useCases/shift/Delete/IDeleteShiftUseCase.js";
import DeleteShiftUseCase from "./useCases/shift/Delete/DeleteShiftUseCase.js";
import type IGetAllShiftsUseCase from "./useCases/shift/GetAllShifts/IGetAllShiftsUseCase.js";
import GetAllShiftsUseCase from "./useCases/shift/GetAllShifts/GetAllShiftsUseCase.js";
import type IGetAllWorkplaceUseCase from "./useCases/workplace/GetAll/IGetAllWokplaceUseCase.js";
import GetAllWorkplaceUseCase from "./useCases/workplace/GetAll/GetAllWokplaceUseCase.js";

/* AddUseCases */
// User Use Cases
container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
  useClass: RegisterUserUseCase,
});
container.register<ILoginUserUseCase>("ILoginUserUseCase", {
  useClass: LoginUserUseCase,
});
container.register<IGetUserProfileUseCase>("IGetUserProfileUseCase", {
  useClass: GetUserProfileUseCase,
});
container.register<IUpdateUserUseCase>("IUpdateUserUseCase", {
  useClass: UpdateUserUseCase,
});
container.register<IChangePasswordUseCase>("IChangePasswordUseCase", {
  useClass: ChangePasswordUseCase,
});

// Employee Use Cases
container.register<IRegisterEmployeeUseCase>("IRegisterEmployeeUseCase", {
  useClass: RegisterEmployeeUseCase,
});
container.register<IGetAllShiftsUseCase>("IGetAllShiftsUseCase", {
  useClass: GetAllShiftsUseCase,
});
container.register<IGetByIdEmployeeUseCase>("IGetByIdEmployeeUseCase", {
  useClass: GetByIdEmployeeUseCase,
});
container.register<IUpdateEmployeeUseCase>("IUpdateEmployeeUseCase", {
  useClass: UpdateEmployeeUseCase,
});
container.register<IDeleteEmployeeUseCase>("IDeleteEmployeeUseCase", {
  useClass: DeleteEmployeeUseCase,
});

// Workplace Use Cases
container.register<IRegisterWorkplaceUseCase>("IRegisterWorkplaceUseCase", {
  useClass: RegisterWorkplaceUseCase,
});
container.register<IGetAllWorkplaceUseCase>("IGetAllWorkplaceUseCase", {
  useClass: GetAllWorkplaceUseCase,
});
container.register<IGetByIdWorkplaceUseCase>("IGetByIdWorkplaceUseCase", {
  useClass: GetByIdWorkplaceUseCase,
});
container.register<IUpdateWorkplaceUseCase>("IUpdateWorkplaceUseCase", {
  useClass: UpdateWorkplaceUseCase,
});
container.register<IDeleteEmployeeUseCase>("IDeleteEmployeeUseCase", {
  useClass: DeleteEmployeeUseCase,
});

// Shift Use Case
container.register<IRegisterShiftUseCase>("IRegisterShiftUseCase", {
  useClass: RegisterShiftUseCase,
});
container.register<IGetAllShiftsUseCase>("IGetAllShiftsUseCase", {
  useClass: GetAllShiftsUseCase,
});
container.register<IFilterShiftUseCase>("IFilterShiftUseCase", {
  useClass: FilterShiftUseCase,
});
container.register<IGetByIdShiftUseCase>("IGetByIdShiftUseCase", {
  useClass: GetByIdShiftUseCase,
});
container.register<IUpdateShiftUseCase>("IUpdateShiftUseCase", {
  useClass: UpdateShiftUseCase,
});
container.register<IDeleteShiftUseCase>("IDeleteShiftUseCase", {
  useClass: DeleteShiftUseCase,
});
