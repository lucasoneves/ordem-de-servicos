import express from "express";

import OrderController from "../controllers/orderController.js";
import paginate from "../middlewares/paginate.js";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/formErrors.js";

const routes = express.Router();

routes.get("/os", OrderController.getOrders, paginate);
routes.get("/os/search", OrderController.searchOrderByTitle, paginate);

routes.post("/os", OrderController.recordOrder);

routes.get("/os/:id", OrderController.getOrderDetail);

routes.put(
  "/os/:id",
  body("description").notEmpty().withMessage("Campo descrição é obrigatório"),
  body("title").notEmpty().withMessage("Campo título é obrigatório"),
  body("title").notEmpty().withMessage("Campo título é obrigatório"),
  handleInputErrors,
  OrderController.updateOrder
);

routes.delete("/os/:id", OrderController.deleteOrder);

export default routes;
