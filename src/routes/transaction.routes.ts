import { Router } from "express";
import { TransactionModel } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
import { TransactionController } from "../controllers/transaction.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const transactionModel = new TransactionModel();
    const transactionService = new TransactionService(transactionModel);
    const controller = new TransactionController(transactionService);

    router.get("/", roleAuthorization(['admin', 'employee','customer']), controller.getTransactions);
    router.get('/:id', roleAuthorization(['admin', 'employee','customer']), controller.getTransactionById)
    router.post('/', roleAuthorization(['admin', 'employee']), controller.postTransaction)
    router.patch('/:id', roleAuthorization(['admin', 'employee']), controller.patchTransaction)

    return router;
  }
}
