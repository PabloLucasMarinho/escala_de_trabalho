import { container } from "tsyringe";
import type { IGetUserProfileUseCase } from "./useCases/user/Profile/IGetUserProfileUseCase.js";
import { GetUserProfileUseCase } from "./useCases/user/Profile/GetUserProfileUseCase.js";
import type { IRegisterUserUseCase } from "./useCases/user/register/IRegisterUserUseCase.js";
import { RegisterUserUseCase } from "./useCases/user/register/RegisterUserUseCase.js";
import type { ILoginUserUseCase } from "./useCases/user/Login/ILoginUserUseCase.js";
import { LoginUserUseCase } from "./useCases/user/Login/LoginUserUseCase.js";
import type { IUpdateUserUseCase } from "./useCases/user/Update/IUpdateUserUseCase.js";
import { UpdateUserUseCase } from "./useCases/user/Update/UpdateUserUseCase.js";

// AddUseCases
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
