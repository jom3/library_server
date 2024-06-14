import { LoanModel } from '../models/loan.model';
import { Loan } from '../shared/schemas/loans.schema';

export class LoanService{

  constructor(
    private readonly loanModel:LoanModel
  ){}

  async getLoans():Promise<Loan[]>{
    return await this.loanModel.getLoans()
  }
  
  async getLoanById(id:number):Promise<Loan>{
    return await this.loanModel.getLoanById(id)
  }
  
  async postLoan(loan:Loan):Promise<Loan>{
    return await this.loanModel.postLoan(loan)
  }
  
  async patchLoan(loan:Loan, id:number):Promise<Loan>{
    return await this.loanModel.patchLoan(loan,id)
  }

  async returnBook(id:number):Promise<Loan>{
    return await this.loanModel.returnBook(id)
  }
}
