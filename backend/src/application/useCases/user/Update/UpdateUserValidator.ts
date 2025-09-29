import z from "zod";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestUpdateUserJson from "../../../../shared/communication/Requests/RequestUpdateUserJson.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class UpdateUserValidator extends BaseValidator {
  public static Validate(req: InputData<RequestUpdateUserJson>) {
    return z
      .object({
        name: this.optionalNameStringSchema,
        email: this.optionalEmailStringSchema,
      })
      .parse(req.body);
  }
}
