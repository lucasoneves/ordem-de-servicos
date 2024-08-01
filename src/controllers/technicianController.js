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
  static async createTechnician(req, res, next) {
    try {
  
      const technicianCreated = await technician.create(req.body);
      return res.status(201).json({
        data: { message: "Technician Created", status: res.statusCode, ...technicianCreated._doc },
      });
    } catch (error) {
      next(error)
    }
  }
  

  static async getTechnicianDetail(req, res, next) {
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
      next(error)
    }
  }

  static async updateTechnician(req, res, next) {
    try {
      const id = req.params.id;
      const technicianUpdated = await technician.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        data: { message: "Technician updated", status: 201, technician : {...technicianUpdated._doc} }
      });
    } catch (error) {
      next(error)
    }
  }

  static async deleteTechnician(req, res, next) {
    try {
      const technicianId = req.params.id;
      const techcnicianSelected = await technician.findByIdAndDelete(technicianId);
      res.status(200).json({
        data: { message: "Technician DELETED", status: 201, ...techcnicianSelected }
      });
    } catch (error) {
      next(error)
    }
  }
}

export default TechnicianController;
