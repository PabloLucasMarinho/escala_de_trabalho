// import type { IShiftRepository } from "../../../domain/repositories/IShiftRepository.js";
// import type { IShift } from "../../../infrastructure/entities/IShift.js";
// import type { IRegisterShiftDTO } from "../../../shared/communication/dtos/shift/IRegisterShiftDTO.js";
// import { Types } from "mongoose";

// export default class RegisterShiftUseCase {
//   constructor(private shiftRepository: IShiftRepository) {}

//   async execute(data: IRegisterShiftDTO): Promise<IShift> {
//     const effectiveDate = new Date(data.effectiveDate);

//     const terminationDate = new Date(data.terminationDate);

//     const workplace = new Types.ObjectId(data.workplace);

//     const employee = new Types.ObjectId(data.employee);

//     const newShift = await this.shiftRepository.create({
//       ...data,
//       effectiveDate,
//       terminationDate,
//       workplace,
//       employee,
//     });

//     return newShift;
//   }
// }
