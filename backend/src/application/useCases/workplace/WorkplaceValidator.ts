import z from "zod";
import type { InputData } from "../../../shared/communication/types/InputData.js";
import type RequestWorkplaceJson from "../../../shared/communication/Requests/RequestWorkplaceJson.js";
import BaseValidator from "../../SharedValidators/BaseValidator.js";

export default class WorkplaceValidator extends BaseValidator {
  public static Validate(req: InputData<RequestWorkplaceJson>) {
    return z.object({ name: this.nameStringSchema }).parse(req.body);
  }
}
