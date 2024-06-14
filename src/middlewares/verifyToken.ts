import { NextFunction, Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import jwt, { decode } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

export function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return httpResponse.Forbidden(res, {
      auth: false,
      message: `No token provided`,
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return httpResponse.Forbidden(res, {
      auth: false,
      message: `No token provided`,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_PASSWORD!, (err, decoded:any) => {
    if (err) {
      return httpResponse.InternalServerError(res, {
        auth: false,
        message: "Failed to authenticate token.",
      });
    }
    if(decoded){
      req.user = decoded;
    }

    next();
  });
}

