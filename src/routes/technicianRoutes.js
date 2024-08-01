import express from "express";

import TechnicianController from "../controllers/technicianController.js";

import { body, check } from "express-validator";
import { handleInputErrors } from "../middlewares/formErrors.js";

const routes = express.Router();

// routes.get('/technician/search', OrderController.searchOrderByTitle);
routes.get("/technician", TechnicianController.getTechnicianList);

routes.post(
  "/technician",
  body("title").notEmpty().withMessage("must be at least 5 chars long"), handleInputErrors,
  check("contact.*.email").isEmail().notEmpty(),
  TechnicianController.createTechnician
);

routes.get("/technician/:id", TechnicianController.getTechnicianDetail);

routes.put("/technician/:id", TechnicianController.updateTechnician);

routes.delete("/technician/:id", TechnicianController.deleteTechnician);

export default routes;
