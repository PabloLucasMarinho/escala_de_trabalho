import z from "zod";
import { hourFormatRegex } from "../constants/regex.js";
import { combineDateAndTime } from "../../../infrastructure/utils/dateUtils.js";
import type { IRegisterShiftDTO } from "../dtos/shift/IRegisterShiftDTO.js";
import { Weekday } from "../../../domain/enums/Weekday.js";

export class ShiftSchemas {
  static register() {
    return z
      .object({
        effectiveDate: z.iso
          .date({ error: "Data inválida." })
          .nonempty({ error: "A vigência inicial não pode ser vazia." })
          .trim(),
        terminationDate: z.iso
          .date({ error: "Data inválida." })
          .nonempty({ error: "A vigência final não pode ser vazia." })
          .trim(),
        shiftStart: z
          .string()
          .trim()
          .nonempty({ error: "O horário incial não pode ser vazio." })
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
        workplace: z.string().trim().nonempty({
          error: "É obrigatório informar um local de trabalho para o turno.",
        }),
        employee: z.string().trim().nonempty({
          error: "É obrigatório informar um profissional para o turno.",
        }),
      })
      .refine(
        (data) => {
          const initialDateTime = combineDateAndTime(
            data.effectiveDate,
            data.shiftStart
          );

          const finalDateTime = combineDateAndTime(
            data.terminationDate,
            data.shiftEnd
          );

          return finalDateTime >= initialDateTime;
        },
        {
          error:
            "A data e hora final devem ser posteriores à data e hora inicial.",
          path: ["shiftEnd"],
        }
      );
  }

  public static validateRegister(data: IRegisterShiftDTO) {
    return this.register().parse(data);
  }
}
