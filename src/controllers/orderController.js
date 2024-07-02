import order from "../models/Order.js";

class OrderController {
  static async getOrders(req, res) {
    try {
      const listOs = await order.find({});
      res.status(200).json({
        data: {
          listOs,
        },
      });
    } catch (error) {
      res.status(error.statusCode).json({
        data: {
          message: error.message
        }
      });
    }
  }

  static async recordOrder(req, res) {
    try {
      const newBook = await order.create(req.body);
      res.status(201).json({
        data: { message: "Order Created", status: res.statusCode, ...newBook },
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
      const orderSelected = await order.findById(id);
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
}

export default OrderController;
