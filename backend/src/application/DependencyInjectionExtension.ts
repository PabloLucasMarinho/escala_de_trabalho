import { container } from "tsyringe";
import type { IGetUserProfileUseCase } from "./useCases/user/Profile/IGetUserProfileUseCase.js";
import { GetUserProfileUseCase } from "./useCases/user/Profile/GetUserProfileUseCase.js";
import type { IRegisterUserUseCase } from "./useCases/user/register/IRegisterUserUseCase.js";
import { RegisterUserUseCase } from "./useCases/user/register/RegisterUserUseCase.js";
import type { ILoginUserUseCase } from "./useCases/user/Login/ILoginUserUseCase.js";
import { LoginUserUseCase } from "./useCases/user/Login/LoginUserUseCase.js";
import type { IUpdateUserUseCase } from "./useCases/user/Update/IUpdateUserUseCase.js";
import { UpdateUserUseCase } from "./useCases/user/Update/UpdateUserUseCase.js";
import type { IChangePasswordUseCase } from "./useCases/user/ChangePassword/IChangePasswordUseCase.js";
import { ChangePasswordUseCase } from "./useCases/user/ChangePassword/ChangePasswordUseCase.js";
import type { IRegisterEmployeeUseCase } from "./useCases/employee/Register/IRegisterEmployeeUseCase.js";
import RegisterEmployeeUseCase from "./useCases/employee/Register/RegisterEmployeeUseCase.js";
import type { IGetByIdEmployeeUseCase } from "./useCases/employee/GetById/IGetByIdEmployeeUseCase.js";
import GetByIdEmployeeUseCase from "./useCases/employee/GetById/GetByIdEmployeeUseCase.js";
import type { IUpdateEmployeeUseCase } from "./useCases/employee/Update/IUpdateEmployeeUseCase.js";
import UpdateEmployeeUseCase from "./useCases/employee/Update/UpdateEmployeeUseCase.js";
import type { IDeleteEmployeeUseCase } from "./useCases/employee/Delete/IDeleteEmployeeUseCase.js";
import { DeleteEmployeeUseCase } from "./useCases/employee/Delete/DeleteEmployeeUseCase.js";

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
container.register<IGetByIdEmployeeUseCase>("IGetByIdEmployeeUseCase", {
  useClass: GetByIdEmployeeUseCase,
});
container.register<IUpdateEmployeeUseCase>("IUpdateEmployeeUseCase", {
  useClass: UpdateEmployeeUseCase,
});
container.register<IDeleteEmployeeUseCase>("IDeleteEmployeeUseCase", {
  useClass: DeleteEmployeeUseCase,
});
