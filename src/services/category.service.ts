import { CategoryModel } from '../models/category.model';
import { Category } from '../shared/schemas/category.schema';

export class CategoryService{

  constructor(
    private readonly categoryModel:CategoryModel
  ){}

  async getCategories():Promise<Category[]>{
    return await this.categoryModel.getCategories()
  }
  
  async getCategoryById(id:number):Promise<Category>{
    return await this.categoryModel.getCategoryById(id)
  }
  
  async postCategory(book:Category):Promise<Category>{
    return await this.categoryModel.postCategory(book)
  }
  
  async patchCategory(book:Category, id:number):Promise<Category>{
    return await this.categoryModel.patchCategory(book,id)
  }
}
