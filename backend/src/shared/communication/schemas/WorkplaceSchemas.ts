import { error } from "console";
import type { IRegisterWorkplaceDTO } from "../dtos/workplace/IRegisterWorkplaceDTO.js";
import z from "zod";

export class WorkplaceSchemas {
  private static register() {
    return z.object({
      name: z
        .string()
        .trim()
        .nonempty({ error: "O nome do local de trabalho é obrigatório." }),
    });
  }

  public static validateRegister(data: IRegisterWorkplaceDTO) {
    console.log("ValidateRegister");

    return this.register().parse(data);
  }
}
