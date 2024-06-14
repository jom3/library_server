import { Response } from "express";
import httpResponse from "../responses/http.response";

class SafeParse{
  parse(res:Response, schema:any, data:any):any{
    const result = schema.safeParse(data);
      if (!result.success) {
        httpResponse.BadRequest(res, {
          message: "Validation failed",
          errors: result.error.errors,
        });
        return null;
      }
    return result
  }
}

export default new SafeParse()