import z from "zod";
import { hourFormatRegex, isoDateRegex } from "../../../../shared/communication/constants/regex.js";
import { Weekday } from "../../../../domain/enums/Weekday.js";
import { Frequency } from "../../../../domain/enums/Frequency.js";
import { CombineDateAndTime } from "../../../../infrastructure/utils/dateUtils.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestRegisterShiftJson from "../../../../shared/communication/Requests/RequestRegisterShiftJson.js";
import mongoose from "mongoose";

export default class RegisterShiftValidator {
  private static ValidateData() {
    return z
      .object({
        dateInit: z
          .string()
          .trim()
          .nonempty("A vigência inicial não pode estar vazia.")
          .regex(isoDateRegex, { error: "Data inválida. Use YYYY-MM-DD." }),
        dateEnd: z
          .string()
          .trim()
          .nonempty("A vigência final não pode estar vazia.")
          .regex(isoDateRegex, { error: "Data inválida. Use YYYY-MM-DD." }),
        shiftStart: z
          .string()
          .trim()
          .nonempty({ error: "O horário inicial não pode ser vazio." })
          .superRefine((value, context) => {
            if (value && value.length > 0) {
              if (!hourFormatRegex.test(value)) {
                context.addIssue("Horário inicial inválido.");
              }
            }
          }),
        shiftEnd: z
          .string()
          .trim()
          .nonempty({ error: "O horário final não pode ser vazio." })
          .superRefine((value, context) => {
            if (value && value.length > 0) {
              if (!hourFormatRegex.test(value)) {
                context.addIssue("Horário final inválido.");
              }
            }
          }),
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
      })
      .refine(
        (data) => {
          const initialDateTime = CombineDateAndTime(data.dateInit, data.shiftStart);

          const finalDateTime = CombineDateAndTime(data.dateEnd, data.shiftEnd);

          return finalDateTime >= initialDateTime;
        },
        { error: "A data e hora final devem ser posteriores à data e hora inicial.", path: ["shiftEnd"] }
      )
      .transform((data) => ({
        dateInit: CombineDateAndTime(data.dateInit, data.shiftStart),
        dateEnd: CombineDateAndTime(data.dateEnd, data.shiftEnd),
        weekday: data.weekday,
        frequency: data.frequency,
        workplace: data.workplace,
        employee: data.employee,
      }));
  }

  public static Validate(req: InputData<RequestRegisterShiftJson>) {
    return this.ValidateData().parse(req.body);
  }
}
