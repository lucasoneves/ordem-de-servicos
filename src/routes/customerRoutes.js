import express from 'express';
import CustomerController from '../controllers/customerController.js';

const routes = express.Router();

routes.get("/customers", CustomerController.getCustomerList);
routes.get('/customers/search', CustomerController.searchCustomer)

routes.post("/customer", CustomerController.createCustomer);

routes.get('/customer/:id', CustomerController.getCustomerDetail);

routes.put('/customer/:id', CustomerController.updateCustomer);

routes.delete('/customer/:id', CustomerController.deleteCustomer);


export default routes;