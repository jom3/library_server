import { Router } from "express";
import { LoanModel } from "../models/loan.model";
import { LoanService } from "../services/loan.service";
import { LoanController } from "../controllers/loan.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class LoanRoutes {
  static get routes(): Router {
    const router = Router();
    const loanModel = new LoanModel();
    const loanService = new LoanService(loanModel);
    const controller = new LoanController(loanService);

    router.get("/",roleAuthorization(['admin', 'employee','customer']), controller.getLoans);
    router.get('/:id',roleAuthorization(['admin', 'employee','customer']), controller.getLoanById)
    router.post('/',roleAuthorization(['admin', 'employee']), controller.postLoan)
    router.patch('/:id',roleAuthorization(['admin', 'employee']), controller.patchLoan)
    router.delete('/returnBook/:id',roleAuthorization(['admin', 'employee']), controller.returnBook)

    return router;
  }
}
