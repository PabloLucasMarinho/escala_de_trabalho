import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default interface IDeleteWorkplaceUseCase {
  Execute(req: InputData<null>): Promise<void>;
}
