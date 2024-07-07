import express from 'express';

import OrderController from '../controllers/orderController.js';

const routes = express.Router();

routes.get('/os/search', OrderController.searchOrderByTitle);
routes.get("/os", OrderController.getOrders);

routes.post("/os", OrderController.recordOrder);

routes.get('/os/:id', OrderController.getOrderDetail);

routes.put('/os/:id', OrderController.updateOrder);

routes.delete('/os/:id', OrderController.deleteOrder);



export default routes;