import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { EventService } from "../services/event.service";
import { EventSchema } from "../shared/schemas/event.schema";

export class EventController {
  constructor(private readonly eventSvc: EventService) {}

  getEvents = async (req: Request, res: Response) => {
    try {
      const events = await this.eventSvc.getEvents();
      return httpResponse.Ok(res, events);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the events`,
      });
    }
  };

  getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const event = await this.eventSvc.getEventById(+id);
      if (!event) {
        return httpResponse.NotFound(
          res,
          `There's not an event with id: ${id}`
        );
      }
      return httpResponse.Ok(res, event);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining an event with id:${id}`,
      });
    }
  };

  postEvent = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, EventSchema, req.body)
      if(!result){
        return;
      }
      await this.eventSvc.postEvent(result.data);
      return httpResponse.Created(res, `New event was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating an event`,
      });
    }
  };

  patchEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, EventSchema,req.body)
      if(!result){
        return;
      }
      await this.eventSvc.patchEvent(result.data, +id)
      return httpResponse.Ok(res, `The event with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating an event`,
      });
    }
  };
}
