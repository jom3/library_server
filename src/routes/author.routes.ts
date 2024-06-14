import { Router } from "express";
import { AuthorService } from "../services/author.service";
import { AuthorController } from "../controllers/author.controller";
import { AuthorModel } from "../models/author.model";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class AuthorRoutes {
  static get routes(): Router {
    const router = Router();
    const authorModel = new AuthorModel();
    const authorService = new AuthorService(authorModel);
    const controller = new AuthorController(authorService);

    router.get("/",roleAuthorization(['admin','employee','customer']), controller.getAuthors);
    router.get('/:id',roleAuthorization(['admin','employee','customer']), controller.getAuthorById)
    router.post('/',roleAuthorization(['admin','employee']), controller.postAuthor)
    router.patch('/:id',roleAuthorization(['admin','employee']), controller.patchAuthor)

    return router;
  }
}
