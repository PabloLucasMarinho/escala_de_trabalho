import { inject, injectable } from "tsyringe";
import LoggedUser from "../../../../infrastructure/services/LoggedUser.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IGetByIdWorkplaceUseCase from "./IGetByIdWorkplaceUseCase.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import ResponseWorkplaceJson from "../../../../shared/communication/Responses/ResponseWorkplaceJson.js";

@injectable()
export default class GetByIdWorkplaceUseCase implements IGetByIdWorkplaceUseCase {
  constructor(@inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepository: IWorkplaceReadOnlyRepository) {}

  async Execute(req: InputData<any>): Promise<ResponseWorkplaceJson> {
    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    if (!req.params.id) {
      throw new Error("ID não informado.");
    }

    const workplace = await this.readOnlyRepository.GetById(user, req.params.id);

    if (!workplace) {
      throw new Error("Local de Trabalho não encontrado.");
    }

    const response = new ResponseWorkplaceJson();

    response.name = workplace.name;

    return response;
  }
}
