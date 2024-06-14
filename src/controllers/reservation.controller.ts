import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { ReservationService } from "../services/reservation.service";
import { ReservationSchema } from "../shared/schemas/reservation.schema";

export class ReservationController {
  constructor(private readonly reservationSvc: ReservationService) {}

  getReservations = async (req: Request, res: Response) => {
    try {
      const reservations = await this.reservationSvc.getReservations();
      return httpResponse.Ok(res, reservations);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the reservations`,
      });
    }
  };

  getReservationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const reservation = await this.reservationSvc.getReservationById(+id);
      if (!reservation) {
        return httpResponse.NotFound(
          res,
          `There's not a reservation with id: ${id}`
        );
      }
      return httpResponse.Ok(res, reservation);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining the reservation with id:${id}`,
      });
    }
  };

  postReservation = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, ReservationSchema,req.body)
      if(!result){
        return;
      }
      await this.reservationSvc.postReservation(result.data);
      return httpResponse.Created(res, `New reservation was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a reservation`,
      });
    }
  };

  patchReservation = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, ReservationSchema,req.body)
      if(!result){
        return;
      }
      await this.reservationSvc.patchReservation(result.data, +id)
      return httpResponse.Ok(res, `The reservation with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating the reservation`,
      });
    }
  };

  fullfillReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const reservation = await this.reservationSvc.fullfillReservation(+id);
      if (!reservation) {
        return httpResponse.NotFound(
          res,
          `There's not a reservation with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The reservation was fullfilled`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when fullfilling the reservation with id:${id}`,
      });
    }
  };

  cancelReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const reservation = await this.reservationSvc.cancelReservation(+id);
      if (!reservation) {
        return httpResponse.NotFound(
          res,
          `There's not a reservation with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The reservation was canceled`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when cancelling the reservation with id:${id}`,
      });
    }
  };
}
