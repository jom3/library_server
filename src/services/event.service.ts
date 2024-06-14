import { EventModel } from '../models/event.model';
import { Event } from '../shared/schemas/event.schema';

export class EventService{

  constructor(
    private readonly eventModel:EventModel
  ){}

  async getEvents():Promise<Event[]>{
    return await this.eventModel.getEvents()
  }
  
  async getEventById(id:number):Promise<Event>{
    return await this.eventModel.getEventById(id)
  }
  
  async postEvent(event:Event):Promise<Event>{
    return await this.eventModel.postEvent(event)
  }
  
  async patchEvent(event:Event, id:number):Promise<Event>{
    return await this.eventModel.patchEvent(event,id)
  }
}
