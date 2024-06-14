import { Request, Response } from "express";
import { AuthorSchema } from "../shared/schemas/author.schema";
import { AuthorService } from "../services/author.service";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'

export class AuthorController {
  constructor(private readonly authorSvc: AuthorService) {}

  getAuthors = async (req: Request, res: Response) => {
    try {
      const authors = await this.authorSvc.getAuthors();
      return httpResponse.Ok(res, authors);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the authors`,
      });
    }
  };

  getAuthorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const author = await this.authorSvc.getAuthorById(+id);
      if (!author) {
        return httpResponse.NotFound(
          res,
          `There's not an author with id: ${id}`
        );
      }
      return httpResponse.Ok(res, author);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining an author with id:${id}`,
      });
    }
  };

  postAuthor = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, AuthorSchema,req.body)
      if(!result){
        return;
      }
      await this.authorSvc.postAuthor(result.data);
      return httpResponse.Created(res, `New author was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating an author`,
      });
    }
  };

  patchAuthor = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, AuthorSchema,req.body)
      if(!result){
        return;
      }
      await this.authorSvc.patchAuthor(result.data, +id)
      return httpResponse.Ok(res, `The actor with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating an author`,
      });
    }
  };
}
