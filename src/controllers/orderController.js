import order from "../models/Order.js";
import { customer } from "../models/Customer.js";
import InvalidRequest from "../errors/InvalidRequest.js";

class OrderController {
  static async getOrders(req, res, next) {
    try {
      let { limit = 5, page = 1 } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);

      if (limit > 0 && page > 0) {
        const listOs = await order
          .find({})
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("customer")
          .populate("technician")
          .exec();
        res.status(200).json({
          data: {
            total: listOs.length,
            listOs,
          },
        });
      } else {
        next(new InvalidRequest("Please, check your search query and try again."));
      }
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
      const orderUpdated = await order.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        data: { message: "Order updated", status: 201 },
      });
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
    const titleOrder = req.query.title;
    try {
      const result = await order.find({
        title: { $regex: new RegExp(titleOrder, "i") },
      });
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
