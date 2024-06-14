import express from "express";
import cors from 'cors';
import { AppRoutes } from "../routes/app.routes";


export class Server {
  public readonly app = express();
  private readonly port: number = parseInt(process.env.PORT! ?? 3000);
  private serverInstance: any;

  constructor() {
    this.middlewares()
    this.routes()
  }

  middlewares(){
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:true}))
    this.app.use(cors())
  }

  routes(){
    this.app.use('/api', AppRoutes.routes)
  }

  listen(){
    this.serverInstance = this.app.listen(this.port, ()=>{
      console.log(`Server running on port ${this.port}`)
    })
  }

  close() {
    if (this.serverInstance) {
      this.serverInstance.close();
    }
  }
}
