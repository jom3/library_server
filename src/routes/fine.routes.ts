import { Router } from "express";
import { FineModel } from "../models/fine.model";
import { FineService } from "../services/fine.service";
import { FineController } from "../controllers/fine.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class FineRoutes {
  static get routes(): Router {
    const router = Router();
    const fineModel = new FineModel();
    const fineService = new FineService(fineModel);
    const controller = new FineController(fineService);

    router.get("/",roleAuthorization(['admin', 'employee','customer']), controller.getFines);
    router.get('/:id',roleAuthorization(['admin', 'employee','customer']), controller.getFineById)
    router.post('/',roleAuthorization(['admin', 'employee']), controller.postFine)
    router.patch('/:id',roleAuthorization(['admin', 'employee']), controller.patchFine)
    router.delete('/payFine/:id',roleAuthorization(['admin', 'employee']), controller.payFine)

    return router;
  }
}
