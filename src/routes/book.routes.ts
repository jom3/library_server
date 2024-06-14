import { Router } from "express";
import { BookModel } from "../models/book.model";
import { BookService } from "../services/book.service";
import { BookController } from "../controllers/book.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class BookRoutes {
  static get routes(): Router {
    const router = Router();
    const bookModel = new BookModel();
    const bookService = new BookService(bookModel);
    const controller = new BookController(bookService);

    router.get("/" ,roleAuthorization(['admin','employee','customer']), controller.getBooks);
    router.get('/:id' ,roleAuthorization(['admin','employee','customer']), controller.getBookById)
    router.post('/' ,roleAuthorization(['admin', 'employee']), controller.postBook)
    router.patch('/:id' ,roleAuthorization(['admin', 'employee']), controller.patchBook)
    router.post('/addAuthors' ,roleAuthorization(['admin', 'employee']), controller.addAuthors)
    router.post('/addCategories' ,roleAuthorization(['admin', 'employee']), controller.addCategories)

    return router;
  }
}
