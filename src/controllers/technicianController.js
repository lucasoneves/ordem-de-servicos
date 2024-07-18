import mongoose from "mongoose";
import technician from "../models/Technician.js";

class TechnicianController {
  static async getTechnicianList(req, res) {
    try {
      const technicianList = await technician.find({});
      res.status(200).json({
        data: {
          technicianList,
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
  static async createTechnician(req, res) {
    try {
      const existTechnician = await technician.findOne({
        title: req.body.title,
      });
  
      if (!existTechnician) {
        const technicianCreated = await technician.create(req.body);
        return res.status(201).json({
          data: { message: "Technician Created", status: res.statusCode, ...technicianCreated._doc },
        });
      }
  
      return res.status(400).json({
        data: { message: "Technician name is already been used", status: res.statusCode },
      });
    } catch (error) {
      return res.status(500).json({
        data: {
          message: `Error creating technician: ${error.message}`,
        }
      });
    }
  }
  

  static async getTechnicianDetail(req, res) {
    try {
      const id = req.params.id;
      const techSelected = await technician.findById(id);

      if (techSelected !== null) {
        res.status(200).json({
          data: {
            technician: {
              ...techSelected._doc
            }
          }
        });
      }

      else {
        res.status(404).send({
          data: {
            message: "Technician not found",
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

  static async updateTechnician(req, res) {
    try {
      const id = req.params.id;
      const technicianUpdated = await technician.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        data: { message: "Technician updated", status: 201, technician : {...technicianUpdated._doc} }
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: error.message,
        }
      });
    }
  }

  static async deleteTechnician(req, res) {
    try {
      const technicianId = req.params.id;
      const techcnicianSelected = await technician.findByIdAndDelete(technicianId);
      res.status(200).json({
        data: { message: "Technician DELETED", status: 201, ...techcnicianSelected }
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

export default TechnicianController;
