import { AuthorModel } from '../models/author.model'
import { Author } from '../shared/schemas/author.schema'

export class AuthorService{

  constructor(
    private readonly authorModel:AuthorModel
  ){}

  async getAuthors():Promise<Author[]>{
    return await this.authorModel.getAuthors()
  }
  
  async getAuthorById(id:number):Promise<Author>{
    return await this.authorModel.getAuthorById(id)
  }
  
  async postAuthor(author:Author):Promise<Author>{
    return await this.authorModel.postAuthor(author)
  }
  
  async patchAuthor(author:Author, id:number):Promise<Author>{
    return await this.authorModel.patchAuthor(author,id)
  }
}
