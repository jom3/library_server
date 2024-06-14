import { ReservationModel } from '../models/reservation.model'
import { Reservation } from '../shared/schemas/reservation.schema'

export class ReservationService{

  constructor(
    private readonly reservationModel:ReservationModel
  ){}

  async getReservations():Promise<Reservation[]>{
    return await this.reservationModel.getReservations()
  }
  
  async getReservationById(id:number):Promise<Reservation>{
    return await this.reservationModel.getReservationById(id)
  }
  
  async postReservation(reservation:Reservation):Promise<Reservation>{
    return await this.reservationModel.postReservation(reservation)
  }
  
  async patchReservation(reservation:Reservation, id:number):Promise<Reservation>{
    return await this.reservationModel.patchReservation(reservation,id)
  }

  async fullfillReservation(id:number):Promise<Reservation>{
    return await this.reservationModel.fullfillReservation(id)
  }

  async cancelReservation(id:number):Promise<Reservation>{
    return await this.reservationModel.cancelReservation(id)
  }
}
