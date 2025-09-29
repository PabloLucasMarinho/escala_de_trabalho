import type IUser from "../../infrastructure/entities/IUser.js";
import LoggedUser from "../../infrastructure/services/LoggedUser.js";
import type { InputData } from "../../shared/communication/types/InputData.js";

export const checkLoggedUser = (req: InputData<any>): Promise<IUser> => {
  const loggedUser = new LoggedUser(req);
  const user = loggedUser.User();
  if (!user) {
    throw new Error("Usuário não encotrado.");
  }

  return user;
};
