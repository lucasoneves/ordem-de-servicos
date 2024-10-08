import order from "../models/Order.js";
import ValidationError from "../errors/ValidationError.js";

class OrderController {
  static async getOrders(req, res, next) {
    try {
      const buscaOrdens = order.find();
      const totalOrders = await order.countDocuments();

      req.result = buscaOrdens;
      req.totalOrders = totalOrders;


      next();
    } catch (error) {
      next(error);
    }
  }

  static async recordOrder(req, res, next) {
    const newOrder = req.body;
    try {
      const orderCreated = await order.create(newOrder);
      res.status(201).json({
        data: {
          message: "Order Created",
          status: res.statusCode,
          ...orderCreated,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOrderDetail(req, res, next) {
    try {
      const id = req.params.id;
      const orderSelected = await order
        .findById(id)
        .populate("customer")
        .populate("technician")
        .exec();
      res.status(200).json({
        data: { orderSelected },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req, res, next) {
    try {
      const id = req.params.id;
      await order.findByIdAndUpdate(id, req.body);
      const orderUpdated = await order.findById(id);

      if (order) {
        res.status(200).json({
          data: { message: "Order updated", status: 201, orderUpdated },
        });
      }

    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const orderId = req.params.id;
      const orderDeleted = await order.findByIdAndDelete(orderId);
      if (orderDeleted) {
        res.status(200).json({
          data: { message: "Order DELETED", status: 201, ...orderDeleted },
        });
        return false;
      }

      res.status(404).json({
        data: { message: "Order not found", status: 404, ...orderDeleted },
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchOrderByTitle(req, res, next) {

    const search = req.query

    try {
      const result = await order.find(search);
      res.status(200).json({
        data: {
          ...result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
