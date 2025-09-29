import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IDeleteShiftUseCase {
  Execute(req: InputData<any>): Promise<void>;
}
