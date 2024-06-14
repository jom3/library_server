import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { RoleService } from "../services/role.service";
import { RoleSchema } from "../shared/schemas/role.schema";

export class RoleController {
  constructor(private readonly roleSvc: RoleService) {}

  getRoles = async (req: Request, res: Response) => {
    try {
      const roles = await this.roleSvc.getRoles();
      return httpResponse.Ok(res, roles);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the roles`,
      });
    }
  };

  getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const role = await this.roleSvc.getRoleById(+id);
      if (!role) {
        return httpResponse.NotFound(
          res,
          `There's not a role with id: ${id}`
        );
      }
      return httpResponse.Ok(res, role);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining a role with id:${id}`,
      });
    }
  };

  postRole = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, RoleSchema, req.body)
      if(!result){
        return;
      }
      await this.roleSvc.postRole(result.data);
      return httpResponse.Created(res, `New role was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a role`,
      });
    }
  };

  patchRole = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, RoleSchema,req.body)
      if(!result){
        return;
      }
      await this.roleSvc.patchRole(result.data, +id)
      return httpResponse.Ok(res, `The role with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating a role`,
      });
    }
  };
}
