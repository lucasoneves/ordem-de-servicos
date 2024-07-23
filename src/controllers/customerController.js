import mongoose from "mongoose";
import {customer} from "../models/Customer.js";

class CustomerController {
  static async getCustomerList(req, res, next) {
    try {
      const customersList = await customer.find({});
      res.status(200).json({
        data: {
          total: customersList.length,
          customersList,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCustomer(req, res, next) {
    try {
      const customerCreated = await customer.create(req.body);
      res.status(201).json({
        data: { message: "Customer Created", status: res.statusCode, ...customerCreated._doc },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerDetail(req, res, next) {
    try {
      const id = req.params.id;
      const customerSelected = await customer.findById(id);

      if (customerSelected !== null) {
        res.status(200).json({
          data: {
            customer: {
              ...customerSelected._doc
            }
          }
        });
      }

      else {
        res.status(404).send({
          data: {
            message: "Customer not found",
            status: res.statusCode
          }
        })
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCustomer(req, res, next) {
    try {
      const id = req.params.id;
      const customerUpdated = await customer.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        data: { message: "Customer updated", status: 201, customer : {...customerUpdated._doc} }
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCustomer(req, res, next) {
    try {
      const customerId = req.params.id;
      const customerDeleted = await customer.findByIdAndDelete(customerId);
      res.status(200).json({
        data: { message: "Customer DELETED", status: 201, ...customerDeleted }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CustomerController;
