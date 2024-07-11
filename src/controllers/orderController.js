import order from "../models/Order.js";
import { customer } from "../models/Customer.js";

class OrderController {
  static async getOrders(req, res) {
    try {
      const listOs = await order.find({}).populate('customer').exec();
      res.status(200).json({
        data: {
          listOs,
        },
      });
    } catch (error) {
      // res.status(error.statusCode).json({
      //   data: {
      //     message: error.message
      //   }
      // });
      console.error("ERROR", error)
      res.json({ data: { error: error.message } });
    }
  }

  static async recordOrder(req, res) {
    const newOrder = req.body
    try {
      const orderFound = await customer.findById(newOrder.customer)
      const orderComplete = {
        ...newOrder,
        customer: {
          ...orderFound._doc
        }
      }
      const orderCreated = await order.create(orderComplete)
      res.status(201).json({
        data: { message: "Order Created", status: res.statusCode, ...orderCreated },
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: `Error creating order: ${error.message}`,
        }
      })
    }
  }

  static async getOrderDetail(req, res) {
    try {
      const id = req.params.id;
      const orderSelected = await order.findById(id).populate('customer').exec();
      res.status(200).json({
        data: { orderSelected }
      });
    } catch (error) {
      res.status(error.statusCode).json({
        data: {
          message: error.message
        }
      });
    }
  }

  static async updateOrder(req, res) {
    try {
      const id = req.params.id;
      const orderUpdated = await order.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        data: { message: "Order updated", status: 201 }
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: error.message,
        }
      });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const orderDeleted = await order.findByIdAndDelete(orderId);
      res.status(200).json({
        data: { message: "Order DELETED", status: 201, ...orderDeleted }
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: error.message,
        }
      });
    }
  }

  static async searchOrderByTitle(req, res) {
    const titleOrder = req.query.title;
    try {
      const result = await order.find({ title: { $regex: new RegExp(titleOrder, 'i') } });
      res.status(200).json({
        data: {
          ...result
        }
      });
    } catch (error) {
      res.status(error.statusCode)
    }
  }
}

export default OrderController;
