import { container } from "tsyringe";
import UserRepository from "./repositories/UserRepository.js";
import type IUserReadOnlyRepository from "../domain/repositories/user/IUserReadOnlyRepository.js";
import type IUserWriteOnlyRepository from "../domain/repositories/user/IUserWriteOnlyRepository.js";
import type IUserUpdateOnlyRepository from "../domain/repositories/user/IUserUpdateOnlyRepository.js";
import type IPasswordEncripter from "../domain/security/Cryptography/IPasswordEncripter.js";
import BCryptNet from "./security/BCryptNet.js";
import type IAccessTokenGenerator from "../domain/security/Tokens/IAccessTokenGenerator.js";
import TokenHandler from "./security/Tokens/TokenHandler.js";
import type ILoggedUser from "../domain/services/ILoggedUser.js";
import LoggedUser from "./services/LoggedUser.js";
import EmployeeRepository from "./repositories/EmployeeRepository.js";
import type IEmployeeReadOnlyRepository from "../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type IEmployeeWriteOnlyRepository from "../domain/repositories/Employee/IEmployeeWriteOnlyRepository.js";
import type IEmployeeUpdateOnlyRepository from "../domain/repositories/Employee/IEmployeeUpdateOnlyRepository.js";
import type IEmployeeDeleteOnlyRepository from "../domain/repositories/Employee/IEmployeeDeleteOnlyRepository.js";
import WorkplaceRepository from "./repositories/WorkplaceRepository.js";
import type IWorkplaceWriteOnlyRepository from "../domain/repositories/Workplace/IWorkplaceWriteOnlyRepository.js";
import type IWorkplaceReadOnlyRepository from "../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceUpdateOnlyRepository from "../domain/repositories/Workplace/IWorkplaceUpdateOnlyRepository.js";
import type IWorkplaceDeleteOnlyRepository from "../domain/repositories/Workplace/IWorkplaceDeleteOnlyRepository.js";
import type IShiftWriteOnlyRepository from "../domain/repositories/Shift/IShiftWriteOnlyRepository.js";
import ShiftRepository from "./repositories/ShiftRepository.js";
import type IShiftReadOnlyRepository from "../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import type IShiftUpdateOnlyRepository from "../domain/repositories/Shift/IShiftUpdateOnlyRepository.js";
import type IShiftDeleteOnlyRepository from "../domain/repositories/Shift/IShiftDeleteOnlyRepository.js";

/* AddRepositories */
// User Repository
container.register<IUserReadOnlyRepository>("IUserReadOnlyRepository", {
  useClass: UserRepository,
});
container.register<IUserWriteOnlyRepository>("IUserWriteOnlyRepository", {
  useClass: UserRepository,
});
container.register<IUserUpdateOnlyRepository>("IUserUpdateOnlyRepository", {
  useClass: UserRepository,
});

// Employee Repository
container.register<IEmployeeReadOnlyRepository>("IEmployeeReadOnlyRepository", {
  useClass: EmployeeRepository,
});
container.register<IEmployeeWriteOnlyRepository>("IEmployeeWriteOnlyRepository", {
  useClass: EmployeeRepository,
});
container.register<IEmployeeUpdateOnlyRepository>("IEmployeeUpdateOnlyRepository", {
  useClass: EmployeeRepository,
});
container.register<IEmployeeDeleteOnlyRepository>("IEmployeeDeleteOnlyRepository", {
  useClass: EmployeeRepository,
});

// Workplace Repository
container.register<IWorkplaceWriteOnlyRepository>("IWorkplaceWriteOnlyRepository", {
  useClass: WorkplaceRepository,
});
container.register<IWorkplaceReadOnlyRepository>("IWorkplaceReadOnlyRepository", {
  useClass: WorkplaceRepository,
});
container.register<IWorkplaceUpdateOnlyRepository>("IWorkplaceUpdateOnlyRepository", {
  useClass: WorkplaceRepository,
});
container.register<IWorkplaceDeleteOnlyRepository>("IWorkplaceDeleteOnlyRepository", {
  useClass: WorkplaceRepository,
});

// Shift Repository
container.register<IShiftWriteOnlyRepository>("IShiftWriteOnlyRepository", {
  useClass: ShiftRepository,
});
container.register<IShiftReadOnlyRepository>("IShiftReadOnlyRepository", {
  useClass: ShiftRepository,
});
container.register<IShiftUpdateOnlyRepository>("IShiftUpdateOnlyRepository", {
  useClass: ShiftRepository,
});
container.register<IShiftDeleteOnlyRepository>("IShiftDeleteOnlyRepository", {
  useClass: ShiftRepository,
});

// AddPasswordEncripter
container.register<IPasswordEncripter>("IPasswordEncripter", {
  useClass: BCryptNet,
});

// AddTokenHandler
container.register<IAccessTokenGenerator>("IAccessTokenGenerator", {
  useClass: TokenHandler,
});
