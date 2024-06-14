import { Router } from "express";
import { AuthModel } from "../models/auth.model";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authModel = new AuthModel();
    const authService = new AuthService(authModel);
    const controller = new AuthController(authService);

    router.post('/', controller.login)

    return router;
  }
}
