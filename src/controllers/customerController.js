import mongoose from "mongoose";
import {customer} from "../models/Customer.js";

class CustomerController {
  static async getCustomerList(req, res) {
    try {
      const customersList = await customer.find({});
      res.status(200).json({
        data: {
          customersList,
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

  static async createCustomer(req, res) {
    try {
      const customerCreated = await customer.create(req.body);
      res.status(201).json({
        data: { message: "Customer Created", status: res.statusCode, ...customerCreated._doc },
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: `Error creating customer: ${error.message}`, 
        }
      })
    }
  }

  static async getCustomerDetail(req, res) {
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
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({
          data: {
            message: "Invalid data",
            status: res.statusCode
          }
        })
      }
      res.status(500).send({
        data: {
          message: "Internal Server Error",
          statusCode: error.message
        }
      })
    }
  }

  static async updateCustomer(req, res) {
    try {
      const id = req.params.id;
      const customerUpdated = await customer.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        data: { message: "Customer updated", status: 201, customer : {...customerUpdated._doc} }
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: error.message,
        }
      });
    }
  }

  static async deleteCustomer(req, res) {
    try {
      const customerId = req.params.id;
      const customerDeleted = await customer.findByIdAndDelete(customerId);
      res.status(200).json({
        data: { message: "Customer DELETED", status: 201, ...customerDeleted }
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

export default CustomerController;
