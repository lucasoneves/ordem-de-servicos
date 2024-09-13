import express from "express";
import CustomerController from "../controllers/customerController.js";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/formErrors.js";

const routes = express.Router();

routes.get("/customers", CustomerController.getCustomerList);
routes.get("/customers/search", CustomerController.searchCustomer);

routes.post(
  "/customer",
  body("contact.email").notEmpty().withMessage("Email obrigatório"),
  body("contact.email").isEmail().withMessage("Email inválido"),
  body("title").notEmpty().withMessage("Nome obrigatório"),
  body("contact.phone").notEmpty().isMobilePhone().withMessage("Telefone é obrigatório"),
  body("address.street").notEmpty().withMessage("Logradouro é obrigatório"),
  body("address.addressNumber").notEmpty().withMessage("Número do endereço é obrigatório"),
  handleInputErrors,
  CustomerController.createCustomer
);

routes.get("/customer/:id", CustomerController.getCustomerDetail);

routes.put("/customer/:id", CustomerController.updateCustomer);

routes.delete("/customer/:id", CustomerController.deleteCustomer);

export default routes;
