import { Response } from "express";
import { logger } from "../../config/logger";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

class HttpResponse {
  Ok(res: Response, data: any): Response {
    logger.log('info','success',data)
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Success",
      data: data,
    });
  }

  Created(res: Response, data: any): Response {
    logger.log('info','created', data)
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: "Created",
      data: data,
    });
  }

  BadRequest(res: Response, data: any): Response {
    logger.error('bad request',data)
    return res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Bad Request",
      error: data,
    });
  }

  NotFound(res: Response, data: any): Response {
    logger.error('not found',data)
    return res.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Not Found",
      error: data,
    });
  }

  Unauthorized(res: Response, data: any): Response {
    logger.error('unauthorized',data)
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: "Unauthorized",
      error: data,
    });
  }

  Forbidden(res: Response, data: any): Response {
    logger.error('forbidden',data)
    return res.status(HttpStatus.FORBIDDEN).json({
      statusCode: HttpStatus.FORBIDDEN,
      message: "Forbidden",
      error: data,
    });
  }

  InternalServerError(res: Response, data: any): Response {
    logger.error('internal server error',data)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: data,
    });
  }
}

export default new HttpResponse();
