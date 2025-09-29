import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IDeleteEmployeeUseCase {
  Execute(req: InputData<null>): Promise<void>;
}
