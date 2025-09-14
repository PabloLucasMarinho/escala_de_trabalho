// import type { Request, Response } from "express";
// import { EmployeeSchemas } from "../../shared/communication/schemas/EmployeeSchemas.js";
// import RegisterEmployeeUseCase from "../../application/useCases/employee/RegisterEmployeeUseCase.js";
// import { EmployeeRepository } from "../../infrastructure/repositories/EmployeeRepository.js";
// import { AuthService } from "../../infrastructure/services/AuthService.js";

// const employeeRepository = new EmployeeRepository();
// const authService = new AuthService();
// const registerEmployeeUseCase = new RegisterEmployeeUseCase(
//   employeeRepository,
//   authService
// );

// export default class EmployeeController {
//   static async register(req: Request, res: Response): Promise<void> {
//     // Validação dos dados enviados
//     const validatedData = EmployeeSchemas.validateRegister(req.body);

//     const token = authService.getToken(req);

//     // Cria funcionário no bd
//     const newEmployee = await registerEmployeeUseCase.execute(
//       validatedData,
//       token!
//     );

//     res.status(200).json({
//       newEmployee: newEmployee,
//     });
//   }
// }
