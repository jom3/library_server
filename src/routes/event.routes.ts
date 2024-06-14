import { Router } from "express";
import { EventModel } from "../models/event.model";
import { EventService } from "../services/event.service";
import { EventController } from "../controllers/event.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class EventRoutes {
  static get routes(): Router {
    const router = Router();
    const eventModel = new EventModel();
    const eventService = new EventService(eventModel);
    const controller = new EventController(eventService);

    router.get("/",roleAuthorization(['admin', 'employee','customer']), controller.getEvents);
    router.get('/:id',roleAuthorization(['admin', 'employee','customer']), controller.getEventById)
    router.post('/',roleAuthorization(['admin']), controller.postEvent)
    router.patch('/:id',roleAuthorization(['admin']), controller.patchEvent)

    return router;
  }
}
