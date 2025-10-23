import type ResponseEmployeeJson from "../../../../shared/communication/Responses/ResponseEmployeeJson.js";

export default interface IGetAllEmployeeUseCase {
  Execute(): Promise<ResponseEmployeeJson[] | null>;
}
