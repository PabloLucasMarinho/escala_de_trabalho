import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IRegisterWorkplaceUseCase from "./IRegisterWorkplaceUseCase.js";
import type RequestWorkplaceJson from "../../../../shared/communication/Requests/RequestWorkplaceJson.js";
import ResponseRegisteredWorkplaceJson from "../../../../shared/communication/Responses/ResponseRegisteredWorkplaceJson.js";
import type IWorkplace from "../../../../infrastructure/entities/IWorkplace.js";
import WorkplaceValidator from "../WorkplaceValidator.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceWriteOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceWriteOnlyRepository.js";
import LoggedUser from "../../../../infrastructure/services/LoggedUser.js";

@injectable()
export default class RegisterWorkplaceUseCase implements IRegisterWorkplaceUseCase {
  constructor(
    @inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepository: IWorkplaceReadOnlyRepository,
    @inject("IWorkplaceWriteOnlyRepository") private readonly writeOnlyRepository: IWorkplaceWriteOnlyRepository
  ) {}

  async Execute(req: InputData<RequestWorkplaceJson>): Promise<ResponseRegisteredWorkplaceJson> {
    const workplace = await this.Validate(req);

    const loggedUser = new LoggedUser(req);

    const user = await loggedUser.User();

    workplace.adm = user._id!;

    const newWorkplace = await this.writeOnlyRepository.Add(workplace);

    const response = new ResponseRegisteredWorkplaceJson();

    response.id = newWorkplace._id!.toString();
    response.name = newWorkplace.name;

    return response;
  }

  private async Validate(req: InputData<RequestWorkplaceJson>): Promise<IWorkplace> {
    const workplace = WorkplaceValidator.Validate(req);

    const workplaceExist = await this.readOnlyRepository.ExistActiveWorkplaceWithName(workplace.name);
    if (workplaceExist) {
      throw new Error("Local de trabalho já cadastrado.");
    }

    return workplace;
  }
}
