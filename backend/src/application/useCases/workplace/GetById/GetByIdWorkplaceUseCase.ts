import { inject, injectable } from "tsyringe";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IGetByIdWorkplaceUseCase from "./IGetByIdWorkplaceUseCase.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import ResponseWorkplaceJson from "../../../../shared/communication/Responses/ResponseWorkplaceJson.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";

@injectable()
export default class GetByIdWorkplaceUseCase implements IGetByIdWorkplaceUseCase {
  constructor(@inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepository: IWorkplaceReadOnlyRepository) {}

  async Execute(req: InputData<null>): Promise<ResponseWorkplaceJson> {
    const paramsId = checkParamsId(req.params.id);

    const workplace = await this.readOnlyRepository.GetById(paramsId);

    if (!workplace || !workplace._id) {
      throw new Error("Local de Trabalho não encontrado.");
    }

    const response = new ResponseWorkplaceJson();

    response.id = workplace._id.toString();
    response.name = workplace.name;
    response.createdBy = workplace.createdBy?.toString();
    response.updatedBy = workplace.updatedBy?.toString();

    return response;
  }
}
