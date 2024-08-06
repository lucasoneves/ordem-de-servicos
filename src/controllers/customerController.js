import mongoose from "mongoose";
import {customer} from "../models/Customer.js";
import NotFound from "../errors/NotFound.js";

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
        next(new NotFound("Customer not found"))
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCustomer(req, res, next) {
    try {
      const id = req.params.id;
      const customerUpdated = await customer.findByIdAndUpdate(id, req.body);

      if (customerUpdated !== null) {
        res.status(200).json({
          data: { message: "Customer updated", status: 201, customer : {...customerUpdated._doc} }
        });
      } else {
        next(new NotFound("Customer not found"))
      }

    } catch (error) {
      next(error);
    }
  }

  static async deleteCustomer(req, res, next) {
    try {
      const customerId = req.params.id;
      const customerDeleted = await customer.findByIdAndDelete(customerId);
      
      if (customerDeleted !== null) {
        res.status(200).json({
          data: { message: "Customer DELETED", status: 201, ...customerDeleted }
        });
      } else {
        next(new NotFound("Customer not found"))
      }

    } catch (error) {
      next(error);
    }
  }

  static async searchCustomer(req, res, next) {
    const titleCustomer = req.query.title;

    const search = {}

    if (titleCustomer) {
      search.title = { $regex: new RegExp(titleCustomer, 'i') }
    }
    try {
      const result = await customer.find(search);
      res.status(200).json({
        data: {
          ...result
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

export default CustomerController;
