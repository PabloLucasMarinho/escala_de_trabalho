import z from "zod";
import { Weekday } from "../../../../domain/enums/Weekday.js";
import { Frequency } from "../../../../domain/enums/Frequency.js";
import mongoose from "mongoose";
import type RequestFilterShiftJson from "../../../../shared/communication/Requests/RequestFilterShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";

export default class FilterShiftValidator {
  private static ValidateData() {
    return z.object({
      weekday: z
        .string()
        .trim()
        .optional()
        .superRefine((value, context) => {
          if (value && value.length > 0) {
            if (!Object.values(Weekday).includes(value as Weekday)) {
              context.addIssue("Dia da semana inválido.");
            }
          }
        }),
      frequency: z
        .string()
        .trim()
        .optional()
        .superRefine((value, context) => {
          if (value && value.length > 0) {
            if (!Object.values(Frequency).includes(value as Frequency)) {
              context.addIssue("Frequência inválida.");
            }
          }
        }),
      workplace: z
        .string()
        .trim()
        .refine((value) => value.length === 0 || mongoose.Types.ObjectId.isValid(value), {
          error: "Local de Trabalho inválido.",
        })
        .transform((value) => {
          if (value.length === 0) {
            return undefined;
          }

          return new mongoose.Types.ObjectId(value);
        })
        .optional(),
      employee: z
        .string()
        .trim()
        .refine((value) => value.length === 0 || mongoose.Types.ObjectId.isValid(value), {
          error: "Colaborador inválido.",
        })
        .transform((value) => {
          if (value.length === 0) {
            return undefined;
          }

          return new mongoose.Types.ObjectId(value);
        })
        .optional(),
    });
  }

  public static Validate(req: InputData<RequestFilterShiftJson>) {
    return this.ValidateData().parse(req.body);
  }
}
