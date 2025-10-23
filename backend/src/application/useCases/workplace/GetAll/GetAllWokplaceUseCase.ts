import { inject, injectable } from "tsyringe";
import type IGetAllWorkplaceUseCase from "./IGetAllWokplaceUseCase.js";
import type IWorkplaceReadOnlyRepository from "../../../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import ResponseWorkplaceJson from "../../../../shared/communication/Responses/ResponseWorkplaceJson.js";

@injectable()
export default class GetAllWorkplaceUseCase implements IGetAllWorkplaceUseCase {
  constructor(@inject("IWorkplaceReadOnlyRepository") private readonly readOnlyRepository: IWorkplaceReadOnlyRepository) {}

  async Execute(): Promise<ResponseWorkplaceJson[] | null> {
    const workplaces = await this.readOnlyRepository.GetAll();

    if (!workplaces) return null;

    const responses: ResponseWorkplaceJson[] = workplaces.map((workplace) => {
      const response: ResponseWorkplaceJson = new ResponseWorkplaceJson();

      if (!workplace._id) throw new Error("ID do colaborador inválido.");

      response.id = workplace._id.toString();
      response.name = workplace.name;

      return response;
    });

    return responses.length === 0 ? null : responses;
  }
}
