import type ResponseWorkplaceJson from "../../../../shared/communication/Responses/ResponseWorkplaceJson.js";

export default interface IGetAllWorkplaceUseCase {
  Execute(): Promise<ResponseWorkplaceJson[] | null>;
}
