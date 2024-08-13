import express from "express";

import TechnicianController from "../controllers/technicianController.js";

import { body, check } from "express-validator";
import { handleInputErrors } from "../middlewares/formErrors.js";

const routes = express.Router();

// routes.get('/technician/search', OrderController.searchOrderByTitle);
routes.get("/technician", TechnicianController.getTechnicianList);
routes.get("/technicians/search", TechnicianController.searchTechnician);

routes.post(
  "/technician",
  body("title")
    .notEmpty()
    .withMessage("Title precisa ser no mínimo 5 caracteres"),
  body("contact.email")
    .isEmail()
    .withMessage("Email inválido")
    .notEmpty()
    .withMessage("O campo email é obrigatório"),
  body("contact.phone")
    .notEmpty()
    .withMessage("O campo telefone é obrigatório"),
  handleInputErrors,
  check("contact.*.email").isEmail().notEmpty(),
  TechnicianController.createTechnician
);

routes.get("/technician/:id", TechnicianController.getTechnicianDetail);

routes.put(
  "/technician/:id",
  body("title")
    .notEmpty()
    .withMessage("Title precisa ser no mínimo 5 caracteres"),
  body("contact.email")
    .isEmail()
    .withMessage("Email inválido")
    .notEmpty()
    .withMessage("O campo email é obrigatório"),
  body("contact.phone")
    .notEmpty()
    .withMessage("O campo telefone é obrigatório"),
  handleInputErrors,
  TechnicianController.updateTechnician
);

routes.delete("/technician/:id", TechnicianController.deleteTechnician);

export default routes;
