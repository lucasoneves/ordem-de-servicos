import express from 'express';
import orders from './ordersRoutes.js';
import customers from './customerRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send("Sistema de ordends de serviços")
  })

  app.use(express.json(), orders, customers);
}

export default routes;