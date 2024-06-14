import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { SupplierService } from "../services/supplier.service";
import { SupplierSchema } from "../shared/schemas/suppliers.schema";

export class SupplierController {
  constructor(private readonly supplierSvc: SupplierService) {}

  getSuppliers = async (req: Request, res: Response) => {
    try {
      const roles = await this.supplierSvc.getSuppliers();
      return httpResponse.Ok(res, roles);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the suppliers`,
      });
    }
  };

  getSupplierById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const role = await this.supplierSvc.getSupplierById(+id);
      if (!role) {
        return httpResponse.NotFound(
          res,
          `There's not a supplier with id: ${id}`
        );
      }
      return httpResponse.Ok(res, role);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining a supplier with id:${id}`,
      });
    }
  };

  postSupplier = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, SupplierSchema, req.body)
      if(!result){
        return;
      }
      await this.supplierSvc.postSupplier(result.data);
      return httpResponse.Created(res, `New supplier was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a supplier`,
      });
    }
  };

  patchSupplier = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, SupplierSchema,req.body)
      if(!result){
        return;
      }
      await this.supplierSvc.patchSupplier(result.data, +id)
      return httpResponse.Ok(res, `The supplier with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating a supplier`,
      });
    }
  };
}
