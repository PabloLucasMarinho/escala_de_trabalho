// import type { Request, Response } from "express";
// import { WorkplaceSchemas } from "../../shared/communication/schemas/WorkplaceSchemas.js";
// import { WorkplaceRepository } from "../../infrastructure/repositories/WorkplaceRepository.js";
// import { RegisterWorkplaceUseCase } from "../../application/useCases/workplace/RegisterWorkplaceUseCase.js";
// import { AuthService } from "../../infrastructure/services/AuthService.js";

// const workplaceRepository = new WorkplaceRepository();
// const authService = new AuthService();
// const registerWorkplaceUseCase = new RegisterWorkplaceUseCase(
//   workplaceRepository,
//   authService
// );

// export default class WorkplaceController {
//   static async register(req: Request, res: Response): Promise<void> {
//     // Valdiação dos dados
//     const validatedData = WorkplaceSchemas.validateRegister(req.body);

//     const token = authService.getToken(req);

//     // Cria local de trabalho no bd
//     const newWorkplace = await registerWorkplaceUseCase.execute(
//       validatedData,
//       token!
//     );

//     // Devolve resposta
//     res.status(200).json(newWorkplace);
//   }

//   static async getWorkplace(req: Request, res: Response): Promise<void> {}

//   static async update(req: Request, res: Response): Promise<void> {}

//   static async delete(req: Request, res: Response): Promise<void> {}
// }
