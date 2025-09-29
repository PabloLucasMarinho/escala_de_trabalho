import z from "zod";
import { dateRegex } from "../../../../shared/communication/constants/regex.js";
import { Weekday } from "../../../../domain/enums/Weekday.js";
import { Frequency } from "../../../../domain/enums/Frequency.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import mongoose from "mongoose";

export default class RegisterShiftValidator {
  private static ValidateData() {
    return z.object({
      dateInit: z
        .string()
        .trim()
        .nonempty("A vigência inicial não pode estar vazia.")
        .regex(dateRegex, { error: "Data inválida. Use o formato YYYY-MM-DDTHH:MM:SSZ." })
        .transform((value) => new Date(value)),
      dateEnd: z
        .string()
        .trim()
        .nonempty("A vigência final não pode estar vazia.")
        .regex(dateRegex, { error: "Data inválida. Use o formato YYYY-MM-DDTHH:MM:SSZ." })
        .transform((value) => new Date(value)),
      weekday: z
        .string()
        .trim()
        .nonempty({ error: "O dia da semana não pode ser vazio." })
        .superRefine((value, context) => {
          if (!Object.values(Weekday).includes(value as Weekday)) {
            context.addIssue("Dia da semana inválido.");
          }
        }),
      frequency: z
        .string()
        .trim()
        .nonempty({ error: "A frequência não pode ser vazio." })
        .superRefine((value, context) => {
          if (!Object.values(Frequency).includes(value as Frequency)) {
            context.addIssue("Frequência inválida.");
          }
        }),
      workplace: z
        .string()
        .trim()
        .nonempty({ error: "É obrigatório informar um Local de Trabalho para o turno." })
        .refine((value) => mongoose.Types.ObjectId.isValid(value), {
          error: "Local de Trabalho inválido.",
        })
        .transform((value) => new mongoose.Types.ObjectId(value)),
      employee: z
        .string()
        .trim()
        .nonempty({ error: "É obrigatório informar um Colaborador para o turno." })
        .refine((value) => mongoose.Types.ObjectId.isValid(value), {
          error: "Colaborador inválido.",
        })
        .transform((value) => new mongoose.Types.ObjectId(value)),
    });
  }

  public static Validate(req: InputData<RequestShiftJson>) {
    return this.ValidateData().parse(req.body);
  }
}
