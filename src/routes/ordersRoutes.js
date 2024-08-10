import express from 'express';

import OrderController from '../controllers/orderController.js';
import paginate from '../middlewares/paginate.js';

const routes = express.Router();

routes.get("/os", OrderController.getOrders, paginate);
routes.get('/os/search', OrderController.searchOrderByTitle, paginate);

routes.post("/os", OrderController.recordOrder);

routes.get('/os/:id', OrderController.getOrderDetail);

routes.put('/os/:id', OrderController.updateOrder);

routes.delete('/os/:id', OrderController.deleteOrder);



export default routes;