import type { InputData } from "../../../shared/communication/types/InputData.js";

export default interface ITokenProvider {
  Value(req: InputData<any>): string;
}
