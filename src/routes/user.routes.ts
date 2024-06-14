import { Router } from "express";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userModel = new UserModel();
    const userService = new UserService(userModel);
    const controller = new UserController(userService);

    router.get("/" , roleAuthorization(['admin', 'employee','customer']), controller.getUsers);
    router.get('/:id' , roleAuthorization(['admin', 'employee','customer']), controller.getUserById)
    router.post('/' , roleAuthorization(['admin', 'employee']), controller.postUser)
    router.patch('/:id' , roleAuthorization(['admin']), controller.patchUser)
    router.delete('/revomeUser/:id' , roleAuthorization(['admin']), controller.removeUser)
    router.delete('/restoreUser/:id' , roleAuthorization(['admin']), controller.restoreUser)
    router.delete('/blockUser/:id' , roleAuthorization(['admin']), controller.blockUser)
    router.delete('/fireUser/:id' , roleAuthorization(['admin']), controller.fireUser)
    router.post('/addUserRole' , roleAuthorization(['admin']), controller.addUserRole)
    
    return router;
  }
}
