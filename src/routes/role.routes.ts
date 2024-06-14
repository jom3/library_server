import { Router } from "express";
import { RoleModel } from "../models/role.model";
import { RoleService } from "../services/role.service";
import { RoleController } from "../controllers/role.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class RoleRoutes {
  static get routes(): Router {
    const router = Router();
    const roleModel = new RoleModel();
    const roleService = new RoleService(roleModel);
    const controller = new RoleController(roleService);

    router.get("/", roleAuthorization(['admin', 'employee','customer']), controller.getRoles);
    router.get('/:id', roleAuthorization(['admin', 'employee','customer']), controller.getRoleById)
    router.post('/', roleAuthorization(['admin']), controller.postRole)
    router.patch('/:id', roleAuthorization(['admin']), controller.patchRole)

    return router;
  }
}
