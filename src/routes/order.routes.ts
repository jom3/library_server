import { Router } from "express";
import { OrderModel } from "../models/order.model";
import { OrderService } from "../services/order.service";
import { OrderController } from "../controllers/order.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();
    const orderModel = new OrderModel();
    const orderService = new OrderService(orderModel);
    const controller = new OrderController(orderService);

    router.get("/",roleAuthorization(['admin', 'employee']), controller.getOrders);
    router.get('/:id',roleAuthorization(['admin', 'employee']), controller.getOrderById)
    router.post('/',roleAuthorization(['admin']), controller.postOrder)
    router.patch('/:id',roleAuthorization(['admin']), controller.patchOrder)
    router.delete('/receiveOrder/:id',roleAuthorization(['admin']), controller.receiveOrder)
    router.delete('/cancelOrder/:id',roleAuthorization(['admin']), controller.cancelOrder)

    router.get("/orderDetails/",roleAuthorization(['admin', 'employee']), controller.getOrderDetails);
    router.get('/orderDetails/:id',roleAuthorization(['admin', 'employee']), controller.getOrderDetailById)
    router.post('/orderDetails/',roleAuthorization(['admin']), controller.postOrderDetail)
    router.patch('/orderDetails/:id',roleAuthorization(['admin']), controller.patchOrderDetail)

    return router;
  }
}
