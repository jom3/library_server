import { Router } from "express";
import { ReservationModel } from "../models/reservation.model";
import { ReservationService } from "../services/reservation.service";
import { ReservationController } from "../controllers/reservation.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class ReservationRoutes {
  static get routes(): Router {
    const router = Router();
    const reservationModel = new ReservationModel();
    const reservationService = new ReservationService(reservationModel);
    const controller = new ReservationController(reservationService);

    router.get("/", roleAuthorization(['admin', 'employee','customer']), controller.getReservations);
    router.get('/:id', roleAuthorization(['admin', 'employee','customer']), controller.getReservationById)
    router.post('/', roleAuthorization(['admin', 'employee','customer']), controller.postReservation)
    router.patch('/:id', roleAuthorization(['admin', 'employee']), controller.patchReservation)
    router.delete('fullfillReservation/:id', roleAuthorization(['admin', 'employee']), controller.fullfillReservation)
    router.delete('cancelReservation/:id', roleAuthorization(['admin', 'employee']), controller.cancelReservation)

    return router;
  }
}
