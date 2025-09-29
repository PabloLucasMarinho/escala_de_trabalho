import z from "zod";
import type { InputData } from "../../../shared/communication/types/InputData.js";
import type RequestEmployeeJson from "../../../shared/communication/Requests/RequestEmployeeJson.js";
import BaseValidator from "../../SharedValidators/BaseValidator.js";

export default class EmployeeValidator extends BaseValidator {
  public static Validate(req: InputData<RequestEmployeeJson>) {
    return z.object({ name: this.nameStringSchema }).parse(req.body);
  }
}
