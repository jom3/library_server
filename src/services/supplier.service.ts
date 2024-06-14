import { SupplierModel } from '../models/supplier.model';
import { Supplier } from '../shared/schemas/suppliers.schema';

export class SupplierService{

  constructor(
    private readonly supplierModel:SupplierModel
  ){}

  async getSuppliers():Promise<Supplier[]>{
    return await this.supplierModel.getSuppliers()
  }
  
  async getSupplierById(id:number):Promise<Supplier>{
    return await this.supplierModel.getSupplierById(id)
  }
  
  async postSupplier(supplier:Supplier):Promise<Supplier>{
    return await this.supplierModel.postSupplier(supplier)
  }
  
  async patchSupplier(supplier:Supplier, id:number):Promise<Supplier>{
    return await this.supplierModel.patchSupplier(supplier,id)
  }
}
