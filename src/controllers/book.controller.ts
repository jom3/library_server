import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { BookService } from "../services/book.service";
import { BookAuthorsSchema, BookCategoriesSchema, BookSchema } from "../shared/schemas/book.schema";

export class BookController {
  constructor(private readonly bookSvc: BookService) {}

  getBooks = async (req: Request, res: Response) => {
    try {
      const books = await this.bookSvc.getBooks();
      return httpResponse.Ok(res, books);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the books`,
      });
    }
  };

  getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const book = await this.bookSvc.getBookById(+id);
      if (!book) {
        return httpResponse.NotFound(
          res,
          `There's not a book with id: ${id}`
        );
      }
      return httpResponse.Ok(res, book);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining a book with id:${id}`,
      });
    }
  };

  postBook = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, BookSchema,req.body)
      if(!result){
        return;
      }
      await this.bookSvc.postBook(result.data);
      return httpResponse.Created(res, `New book was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a book`,
      });
    }
  };

  patchBook = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, BookSchema,req.body)
      if(!result){
        return;
      }
      await this.bookSvc.patchBook(result.data, +id)
      return httpResponse.Ok(res, `The book with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating a book`,
      });
    }
  };

  addAuthors = async (req: Request, res: Response) => {
    const {bookid, authors} = req.body
    try {
      authors.map(async(authorid: any)=>{
        const result = safeParse.parse(res, BookAuthorsSchema, {bookid,authorid})
        if(!result){
          return;
        }
        await this.bookSvc.addAuthor(result.data);
      })
      return httpResponse.Created(res, `The ${authors.length!=1?'authors were':'author was'} added in the book`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when adding the ${authors.length!=1?'authors':'author'} in the book`,
      });
    }
  };

  addCategories = async (req: Request, res: Response) => {
    const {bookid, categories} = req.body
    try {
      categories.map(async(categoryid: any)=>{
        const result = safeParse.parse(res, BookCategoriesSchema, {bookid,categoryid})
        if(!result){
          return;
        }
        await this.bookSvc.addCategory(result.data);
      })
      return httpResponse.Created(res, `The ${categories.length!=1?'categories were':'category was'} added in the book`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when adding the ${categories.length!=1?'categories':'category'} in the book`,
      });
    }
  };
}
