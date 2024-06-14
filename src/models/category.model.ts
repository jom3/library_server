import { pool } from "../config/dbConnection";
import { Category } from "../shared/schemas/category.schema";

export class CategoryModel{
  async getCategories(){
    const res = await pool.query("select * from categories");
    return res.rows;
  };
  
  async getCategoryById(id:number){
    const res = await pool.query('select * from categories where categoryid=$1',[id])
    return res.rows[0]
  };
  
  async postCategory(category:Category){
    const {categoryname} = category
    const res = await pool.query(
      'insert into categories (categoryname) values ($1) returning *',[categoryname]
    )
    return res.rows[0]
  };
  
  async patchCategory(category:Category, id:number){
    const {categoryname} = category
    const res = await pool.query(
      'update categories set categoryname = $1 where categoryid=$2 returning *',[categoryname, id]
    )
    return res.rows[0]
  };
}