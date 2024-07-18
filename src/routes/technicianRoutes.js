import express from 'express';

import TechnicianController from '../controllers/technicianController.js';

const routes = express.Router();

// routes.get('/technician/search', OrderController.searchOrderByTitle);
routes.get("/technician", TechnicianController.getTechnicianList);

routes.post("/technician", TechnicianController.createTechnician);

routes.get('/technician/:id', TechnicianController.getTechnicianDetail);

routes.put('/technician/:id', TechnicianController.updateTechnician);

routes.delete('/technician/:id', TechnicianController.deleteTechnician);



export default routes;