import z from "zod";
import { dateRegex } from "../../../../shared/communication/constants/regex.js";
import { Weekday } from "../../../../domain/enums/Weekday.js";
import { Frequency } from "../../../../domain/enums/Frequency.js";
import { isValidObjectId, Types } from "mongoose";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";

export default class UpdateShiftValidator {
  private static dateSchema = z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z
      .string()
      .regex(dateRegex, "Data inválida. Use o formato YYYY-MM-DDTHH:MM:SSZ.")
      .transform((value) => new Date(value))
      .optional()
  );

  private static enumSchema = (validValues: string[], field: string) => {
    return z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z
        .string()
        .optional()
        .superRefine((value, context) => {
          if (value && !validValues.includes(value)) {
            context.addIssue(`${field} inválido(a)`);
          }
        })
    );
  };

  private static objectIdSchema = z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z
      .string()
      .refine((value) => isValidObjectId(value), { error: "ID inválido." })
      .transform((value) => new Types.ObjectId(value))
      .optional()
  );

  private static ValidateData() {
    return z.object({
      dateInit: this.dateSchema,
      dateEnd: this.dateSchema,
      weekday: this.enumSchema(Object.values(Weekday), "Dia da semana"),
      frequency: this.enumSchema(Object.values(Frequency), "Frequência"),
      workplace: this.objectIdSchema,
      employee: this.objectIdSchema,
    });
  }

  public static Validate(req: InputData<RequestShiftJson>) {
    return this.ValidateData().parse(req.body);
  }
}
