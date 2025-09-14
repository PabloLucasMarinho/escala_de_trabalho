// import type { Request, Response } from "express";
// import { ShiftSchemas } from "../../shared/communication/schemas/ShiftSchemas.js";
// import RegisterShiftUseCase from "../../application/useCases/shift/RegisterShiftUseCase.js";
// import { ShiftRepository } from "../../infrastructure/repositories/ShiftRepository.js";

// const shiftRepository = new ShiftRepository();
// const registerShiftUseCase = new RegisterShiftUseCase(shiftRepository);

// export default class ShiftController {
//   static async register(req: Request, res: Response): Promise<void> {
//     // Validação dos dados enviados
//     const validatedData = ShiftSchemas.validateRegister(req.body);

//     // Cria turno no bd
//     const newShift = await registerShiftUseCase.execute(validatedData);

//     res.status(200).json({ newShift: newShift });
//   }
// }
