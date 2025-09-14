import { container } from "tsyringe";
import type { ILoggedUser } from "../domain/services/ILoggedUser.js";
import { LoggedUser } from "./services/LoggedUser.js";
import type { IUserWriteOnlyRepository } from "../domain/repositories/user/IUserWriteOnlyRepository.js";
import { UserRepository } from "./repositories/UserRepository.js";
import type { IUserReadOnlyRepository } from "../domain/repositories/user/IUserReadOnlyRepository.js";
import type { IPasswordEncripter } from "../domain/security/Cryptography/IPasswordEncripter.js";
import { BCryptNet } from "./security/BCryptNet.js";
import type { IAccessTokenGenerator } from "../domain/security/Tokens/IAccessTokenGenerator.js";
import { JwtTokenGenerator } from "./security/Tokens/Access/Generator/JwtTokenGenerator.js";

// AddRepositories
container.register<IUserWriteOnlyRepository>("IUserWriteOnlyRepository", {
  useClass: UserRepository,
});
container.register<IUserReadOnlyRepository>("IUserReadOnlyRepository", {
  useClass: UserRepository,
});

// AddPasswordEncripter
container.register<IPasswordEncripter>("IPasswordEncripter", {
  useClass: BCryptNet,
});

// AddToken
container.register<IAccessTokenGenerator>("IAccessTokenGenerator", {
  useClass: JwtTokenGenerator,
});

// AddLoggedUser
container.register<ILoggedUser>("ILoggedUser", { useClass: LoggedUser });
