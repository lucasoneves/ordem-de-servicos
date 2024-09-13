import express from 'express';
import orders from './ordersRoutes.js';
import customers from './customerRoutes.js';
import technicians from './technicianRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send("Sistema de ordends de serviços")
  })

  app.use(express.json(), orders, customers, technicians);
}

export default routes;