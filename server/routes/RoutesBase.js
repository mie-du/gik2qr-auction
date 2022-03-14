const db = require('../models');
const express = require('express');
const { MODELS } = require('../../helpers/constants');

module.exports = class RoutesBase {
  service = null;

  constructor(model) {
    this.model = db[model];
    this.router = express.Router();
    switch (model) {
      case MODELS.USER: {
        const ServiceClass = require('../services/UserService');
        this.service = new ServiceClass();
      }
    }
  }

  addGetRoute() {
    this.router.get('/', (req, res) => {
      this.service.getAll().then((result) => res.send(result));
    });
  }

  addGetByIdRoute() {
    this.router.get('/:id', (req, res) => {
      const id = req.params.id;
      this.service.getById(id).then((result) => res.send(result));
    });
  }

  addCreateRoute() {
    this.router.post('/', (req, res) => {
      const data = req.body;

      this.service.create(data).then((result) => {
        res.status(result.status).json(result.data);
      });
    });
  }

  getRouter() {
    return this.router;
  }
};
