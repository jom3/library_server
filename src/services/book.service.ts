import { BookModel } from '../models/book.model'
import { Book, BookAuthor, BookCategory } from '../shared/schemas/book.schema';

export class BookService{

  constructor(
    private readonly bookModel:BookModel
  ){}

  async getBooks():Promise<Book[]>{
    return await this.bookModel.getBooks()
  }
  
  async getBookById(id:number):Promise<Book>{
    return await this.bookModel.getBookById(id)
  }
  
  async postBook(book:Book):Promise<Book>{
    return await this.bookModel.postBook(book)
  }
  
  async patchBook(book:Book, id:number):Promise<Book>{
    return await this.bookModel.patchBook(book,id)
  }

  async addAuthor(bookAuthor:BookAuthor):Promise<BookAuthor>{
    return await this.bookModel.addAuthor(bookAuthor)
  }

  async addCategory(bookCategory:BookCategory):Promise<BookCategory>{
    return await this.bookModel.addCategory(bookCategory)
  }
}
