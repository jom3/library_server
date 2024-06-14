import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { LoanService } from "../services/loan.service";
import { LoanSchema } from "../shared/schemas/loans.schema";

export class LoanController {
  constructor(private readonly loanSvc: LoanService) {}

  getLoans = async (req: Request, res: Response) => {
    try {
      const loans = await this.loanSvc.getLoans();
      return httpResponse.Ok(res, loans);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the loans`,
      });
    }
  };

  getLoanById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const loan = await this.loanSvc.getLoanById(+id);
      if (!loan) {
        return httpResponse.NotFound(
          res,
          `There's not a loan with id: ${id}`
        );
      }
      return httpResponse.Ok(res, loan);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining a loan with id:${id}`,
      });
    }
  };

  postLoan = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, LoanSchema, req.body)
      if(!result){
        return;
      }
      await this.loanSvc.postLoan(result.data);
      return httpResponse.Created(res, `New loan was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a loan`,
      });
    }
  };

  patchLoan = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, LoanSchema,req.body)
      if(!result){
        return;
      }
      await this.loanSvc.patchLoan(result.data, +id)
      return httpResponse.Ok(res, `The loan with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating a loan`,
      });
    }
  };

  returnBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const loan = await this.loanSvc.returnBook(+id);
      if (!loan) {
        return httpResponse.NotFound(
          res,
          `There's not a loan with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The book with id ${loan.bookid} was returned`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining a loan with id:${id}`,
      });
    }
  };
}
