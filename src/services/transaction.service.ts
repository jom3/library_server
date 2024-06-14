import { TransactionModel } from '../models/transaction.model'
import { Transaction } from '../shared/schemas/transaction.schema'

export class TransactionService{

  constructor(
    private readonly transactionModel:TransactionModel
  ){}

  async getTransactions():Promise<Transaction[]>{
    return await this.transactionModel.getTransactions()
  }
  
  async getTransactionById(id:number):Promise<Transaction>{
    return await this.transactionModel.getTransactionById(id)
  }
  
  async postTransaction(reservation:Transaction):Promise<Transaction>{
    return await this.transactionModel.postTransaction(reservation)
  }
  
  async patchTransaction(reservation:Transaction, id:number):Promise<Transaction>{
    return await this.transactionModel.patchTransaction(reservation,id)
  }
}
