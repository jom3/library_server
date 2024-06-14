import { NextFunction, Request, Response } from 'express';
import httpResponse from '../shared/responses/http.response';

interface CustomRequest extends Request {
  user?: any;
}

export const roleAuthorization = (roles:string[]) =>{
  return (req:CustomRequest, res:Response, next:NextFunction) =>{
    if (!req.user || !roles.some(role => req.user.roles.includes(role))) {
      return httpResponse.Unauthorized(res,`You don't have a valid rol`);
    }
    next()
  }
}