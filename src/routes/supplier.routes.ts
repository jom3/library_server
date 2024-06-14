import { Router } from "express";
import { SupplierModel } from "../models/supplier.model";
import { SupplierService } from "../services/supplier.service";
import { SupplierController } from "../controllers/supplier.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class SupplierRoutes {
  static get routes(): Router {
    const router = Router();
    const supplierModel = new SupplierModel();
    const supplierService = new SupplierService(supplierModel);
    const controller = new SupplierController(supplierService);

    router.get("/", roleAuthorization(['admin', 'employee']), controller.getSuppliers);
    router.get('/:id', roleAuthorization(['admin', 'employee']), controller.getSupplierById)
    router.post('/', roleAuthorization(['admin']), controller.postSupplier)
    router.patch('/:id', roleAuthorization(['admin']), controller.patchSupplier)

    return router;
  }
}
