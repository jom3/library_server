import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { AuthService } from "../services/auth.service";
import { AuthSchema } from "../shared/schemas/auth.schema";
import {compareSync} from 'bcrypt'
import { jwtGenerator } from "../helpers/jwtGenerator.helper";

export class AuthController {

  constructor(private readonly authSvc: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, AuthSchema,req.body)
      if(!result){
        return;
      }
      const user = await this.authSvc.login(result.data);
      if(!user){
        return httpResponse.NotFound(res,`There's not an user with that email`)
      }
      if(!compareSync(result.data.password, user.passwordhash)){
        return httpResponse.Unauthorized(res,`The password doesn't match with the introduced email`)
        }
      return httpResponse.Ok(res, {
        token:jwtGenerator(user)
      });
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error on loggin`,
      });
    }
  };

}
