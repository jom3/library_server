import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { CategoryService } from "../services/category.service";
import { CategorySchema } from "../shared/schemas/category.schema";

export class CategoryController {
  constructor(private readonly categorySvc: CategoryService) {}

  getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categorySvc.getCategories();
      return httpResponse.Ok(res, categories);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the categories`,
      });
    }
  };

  getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const category = await this.categorySvc.getCategoryById(+id);
      if (!category) {
        return httpResponse.NotFound(
          res,
          `There's not a category with id: ${id}`
        );
      }
      return httpResponse.Ok(res, category);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining a category with id:${id}`,
      });
    }
  };

  postCategory = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, CategorySchema, req.body)
      if(!result){
        return;
      }
      await this.categorySvc.postCategory(result.data);
      return httpResponse.Created(res, `New category was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a category`,
      });
    }
  };

  patchCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, CategorySchema,req.body)
      if(!result){
        return;
      }
      await this.categorySvc.patchCategory(result.data, +id)
      return httpResponse.Ok(res, `The category with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating a category`,
      });
    }
  };
}
