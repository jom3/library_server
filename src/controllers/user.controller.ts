import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { UserService } from "../services/user.service";
import { UserRoleSchema, UserSchema } from "../shared/schemas/user.schema";
import { hashSync } from "bcrypt";
import * as _ from 'lodash'

export class UserController {
  constructor(private readonly userSvc: UserService) {}

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userSvc.getUsers();
      return httpResponse.Ok(res, users.map(user=> _.omit(user,'passwordhash')));
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the users`,
      });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const user = await this.userSvc.getUserById(+id);
      if (!user) {
        return httpResponse.NotFound(
          res,
          `There's not an user with id: ${id}`
        );
      }
      return httpResponse.Ok(res, _.omit(user,'passwordhash'));
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining an user with id:${id}`,
      });
    }
  };

  postUser = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, UserSchema, req.body)
      if(!result){
        return;
      }
      const passwordHashed =  hashSync(result.data.passwordhash,+process.env.SALT_ROUNDS!)
      await this.userSvc.postUser({...result.data, passwordhash: passwordHashed});
      return httpResponse.Created(res, `New user was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a new user`,
      });
    }
  };

  patchUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, UserSchema,req.body)
      if(!result){
        return;
      }
      await this.userSvc.patchUser(result.data, +id)
      return httpResponse.Ok(res, `The user with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating the user`,
      });
    }
  };

  removeUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const user = await this.userSvc.removeUser(+id);
      if (!user) {
        return httpResponse.NotFound(
          res,
          `There's not an user with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The user with id:${id} was removed`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when removing the user with id:${id}`,
      });
    }
  };

  restoreUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const user = await this.userSvc.restoreUser(+id);
      if (!user) {
        return httpResponse.NotFound(
          res,
          `There's not an user with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The user with id:${id} was restored`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when restoring the user with id:${id}`,
      });
    }
  };

  blockUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const user = await this.userSvc.blockUser(+id);
      if (!user) {
        return httpResponse.NotFound(
          res,
          `There's not an user with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The user with id:${id} was blocked`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when blocking the user with id:${id}`,
      });
    }
  };

  fireUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const user = await this.userSvc.fireUser(+id);
      if (!user) {
        return httpResponse.NotFound(
          res,
          `There's not an user with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The user with id:${id} was fired`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when fire the user with id:${id}`,
      });
    }
  };

  addUserRole = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res,UserRoleSchema, req.body)
      if(!result){
        return;
      }
      await this.userSvc.addUserRole(result.data);
      return httpResponse.Created(res, `New user's role was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when adding a user's role`,
      });
    }
  };
}
