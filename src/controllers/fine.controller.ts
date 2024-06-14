import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { FineService } from "../services/fine.service";
import { FineSchema } from "../shared/schemas/fine.schema";

export class FineController {
  constructor(private readonly fineSvc: FineService) {}

  getFines = async (req: Request, res: Response) => {
    try {
      const fines = await this.fineSvc.getFines();
      return httpResponse.Ok(res, fines);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the fines`,
      });
    }
  };

  getFineById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const fine = await this.fineSvc.getFineById(+id);
      if (!fine) {
        return httpResponse.NotFound(
          res,
          `There's not a fine with id: ${id}`
        );
      }
      return httpResponse.Ok(res, fine);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining a fine with id:${id}`,
      });
    }
  };

  postFine = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, FineSchema, req.body)
      if(!result){
        return;
      }
      await this.fineSvc.postFine(result.data);
      return httpResponse.Created(res, `New fine was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a fine`,
      });
    }
  };

  patchFine = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, FineSchema,req.body)
      if(!result){
        return;
      }
      await this.fineSvc.patchFine(result.data, +id)
      return httpResponse.Ok(res, `The fine with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating a fine`,
      });
    }
  };

  payFine = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const fine = await this.fineSvc.payFine(+id);
      if (!fine) {
        return httpResponse.NotFound(
          res,
          `There's not a fine with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The fine was paid, the fine with id: ${id}`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when paying a fine with id:${id}`,
      });
    }
  };
}
