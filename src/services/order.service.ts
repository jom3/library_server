import { OrderModel } from '../models/order.model';
import { Order, OrderDetail } from '../shared/schemas/order.schema';

export class OrderService{

  constructor(
    private readonly orderModel:OrderModel
  ){}

  async getOrders():Promise<Order[]>{
    return await this.orderModel.getOrders()
  }
  
  async getOrderById(id:number):Promise<Order>{
    return await this.orderModel.getOrderById(id)
  }
  
  async postOrder(supplier:Order):Promise<Order>{
    return await this.orderModel.postOrder(supplier)
  }
  
  async patchOrder(supplier:Order, id:number):Promise<Order>{
    return await this.orderModel.patchOrder(supplier,id)
  }

  async receiveOrder(id:number):Promise<Order>{
    return await this.orderModel.receiveOrder(id)
  }

  async cancelOrder(id:number):Promise<Order>{
    return await this.orderModel.cancelOrder(id)
  }

  //* books order details

  async getOrderDetails():Promise<OrderDetail[]>{
    return await this.orderModel.getOrderDetails()
  }
  
  async getOrderDetailById(id:number):Promise<OrderDetail>{
    return await this.orderModel.getOrderDetailById(id)
  }
  
  async postOrderDetail(orderDetail:OrderDetail):Promise<OrderDetail>{
    return await this.orderModel.postOrderDetail(orderDetail)
  }
  
  async patchOrderDetail(orderDetail:OrderDetail, id:number):Promise<OrderDetail>{
    return await this.orderModel.patchOrderDetail(orderDetail,id)
  }
}
