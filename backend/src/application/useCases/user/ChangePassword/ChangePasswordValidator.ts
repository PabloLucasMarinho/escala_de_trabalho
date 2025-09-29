import z from "zod";
import { passwordRegex } from "../../../../shared/communication/constants/regex.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestChangePasswordJson from "../../../../shared/communication/Requests/RequestChangePasswordJson.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class ChangePasswordValidator extends BaseValidator {
  public static Validate(req: InputData<RequestChangePasswordJson>) {
    return z.object({ newPassword: this.changePasswordSchema }).parse(req.body);
  }
}
