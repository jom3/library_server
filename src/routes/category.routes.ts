import { Router } from "express";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryModel = new CategoryModel();
    const categoryService = new CategoryService(categoryModel);
    const controller = new CategoryController(categoryService);

    router.get("/",roleAuthorization(['admin', 'employee','customer']), controller.getCategories);
    router.get('/:id',roleAuthorization(['admin', 'employee','customer']), controller.getCategoryById)
    router.post('/',roleAuthorization(['admin', 'employee']), controller.postCategory)
    router.patch('/:id',roleAuthorization(['admin', 'employee']), controller.patchCategory)

    return router;
  }
}
