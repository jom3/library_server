import { FineModel } from '../models/fine.model';
import { Fine } from '../shared/schemas/fine.schema';

export class FineService{

  constructor(
    private readonly fineModel:FineModel
  ){}

  async getFines():Promise<Fine[]>{
    return await this.fineModel.getFines()
  }
  
  async getFineById(id:number):Promise<Fine>{
    return await this.fineModel.getFineById(id)
  }
  
  async postFine(loan:Fine):Promise<Fine>{
    return await this.fineModel.postFine(loan)
  }
  
  async patchFine(loan:Fine, id:number):Promise<Fine>{
    return await this.fineModel.patchFine(loan,id)
  }

  async payFine(id:number):Promise<Fine>{
    return await this.fineModel.payFine(id)
  }
}
