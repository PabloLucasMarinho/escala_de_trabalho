import type ResponseGetAllShiftsJson from "../../../../shared/communication/Responses/ReponseGetAllShiftsJson.js";

export default interface IGetAllShiftsUseCase {
  Execute(): Promise<ResponseGetAllShiftsJson[] | null>;
}
