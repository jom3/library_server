import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { OrderService } from "../services/order.service";
import { OrderDetailSchema, OrderSchema } from "../shared/schemas/order.schema";

export class OrderController {
  constructor(private readonly orderSvc: OrderService) {}

  getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.orderSvc.getOrders();
      return httpResponse.Ok(res, orders);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the orders`,
      });
    }
  };

  getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const order = await this.orderSvc.getOrderById(+id);
      if (!order) {
        return httpResponse.NotFound(
          res,
          `There's not an order with id: ${id}`
        );
      }
      return httpResponse.Ok(res, order);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining the order with id:${id}`,
      });
    }
  };

  postOrder = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, OrderSchema, req.body)
      if(!result){
        return;
      }
      await this.orderSvc.postOrder(result.data);
      return httpResponse.Created(res, `New order was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating the order`,
      });
    }
  };

  patchOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, OrderSchema,req.body)
      if(!result){
        return;
      }
      await this.orderSvc.patchOrder(result.data, +id)
      return httpResponse.Ok(res, `The order with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating the order`,
      });
    }
  };

  receiveOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const order = await this.orderSvc.receiveOrder(+id);
      if (!order) {
        return httpResponse.NotFound(
          res,
          `There's not an order with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The order with id:${id} was received`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when receiving the order with id:${id}`,
      });
    }
  };

  cancelOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const order = await this.orderSvc.cancelOrder(+id);
      if (!order) {
        return httpResponse.NotFound(
          res,
          `There's not an order with id: ${id}`
        );
      }
      return httpResponse.Ok(res, `The order with id:${id} was cancelled`);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when canceling the order with id:${id}`,
      });
    }
  };

  //* book order detail

  getOrderDetails = async (req: Request, res: Response) => {
    try {
      const orderDetails = await this.orderSvc.getOrderDetails();
      return httpResponse.Ok(res, orderDetails);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the order details`,
      });
    }
  };

  getOrderDetailById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const order = await this.orderSvc.getOrderDetailById(+id);
      if (!order) {
        return httpResponse.NotFound(
          res,
          `There's not an order detail with id: ${id}`
        );
      }
      return httpResponse.Ok(res, order);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining the order detail with id:${id}`,
      });
    }
  };

  postOrderDetail = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, OrderDetailSchema, req.body)
      if(!result){
        return;
      }
      await this.orderSvc.postOrderDetail(result.data);
      return httpResponse.Created(res, `New order detail was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating the order detail`,
      });
    }
  };

  patchOrderDetail = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, OrderDetailSchema,req.body)
      if(!result){
        return;
      }
      await this.orderSvc.patchOrderDetail(result.data, +id)
      return httpResponse.Ok(res, `The order detail with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating the order detail`,
      });
    }
  };
}
