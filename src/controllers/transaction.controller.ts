import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { TransactionService } from "../services/transaction.service";
import { TransactionSchema } from "../shared/schemas/transaction.schema";

export class TransactionController {
  constructor(private readonly transactionSvc: TransactionService) {}

  getTransactions = async (req: Request, res: Response) => {
    try {
      const transactions = await this.transactionSvc.getTransactions();
      return httpResponse.Ok(res, transactions);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the transactions`,
      });
    }
  };

  getTransactionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const transaction = await this.transactionSvc.getTransactionById(+id);
      if (!transaction) {
        return httpResponse.NotFound(
          res,
          `There's not a transaction with id: ${id}`
        );
      }
      return httpResponse.Ok(res, transaction);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining the transaction with id:${id}`,
      });
    }
  };

  postTransaction = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, TransactionSchema,req.body)
      if(!result){
        return;
      }
      await this.transactionSvc.postTransaction(result.data);
      return httpResponse.Created(res, `New transaction was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a transaction`,
      });
    }
  };

  patchTransaction = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, TransactionSchema,req.body)
      if(!result){
        return;
      }
      await this.transactionSvc.patchTransaction(result.data, +id)
      return httpResponse.Ok(res, `The transaction with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating the transaction`,
      });
    }
  };
}
