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
        break;
      }
      case MODELS.ITEM: {
        const ServiceClass = require('../services/ItemService');
        this.service = new ServiceClass();
        break;
      }
      default: {
        throw 'No service';
      }
    }
  }

  addGetRoute() {
    try {
      this.router.get('/', (req, res) => {
        this.service
          .getAll()
          .then((result) => res.status(result.status).json(result.data));
      });
    } catch (e) {
      throw e;
    }
  }

  addGetByIdRoute() {
    try {
      this.router.get('/:id', (req, res) => {
        const id = req.params?.id;
        this.service
          .getById(id)
          .then((result) => res.status(result.status).json(result.data));
      });
    } catch (e) {
      throw e;
    }
  }

  addPostRoute() {
    try {
      this.router.post('/', (req, res) => {
        const data = req.body;
        this.service.create(data).then((result) => {
          res.status(result.status).json(result.data);
        });
      });
    } catch (e) {
      throw e;
    }
  }

  addPutRoute() {
    try {
      this.router.put('/', (req, res) => {
        const id = req.body.id;
        const data = req.body;
        console.log(id);
        this.service.update(id, data).then((result) => {
          res.status(result.status).json(result.data);
        });
      });
    } catch (e) {
      throw e;
    }
  }

  addDeleteRoute() {
    try {
      this.router.delete('/', (req, res) => {
        const id = req.body.id;

        this.service.destroy(id).then((result) => {
          res.status(result.status).json(result.data);
        });
      });
    } catch (e) {
      throw e;
    }
  }
  addCrudRoutes() {
    this.addGetRoute();
    this.addGetByIdRoute();
    this.addPostRoute();
    this.addPutRoute();
    this.addDeleteRoute();
  }

  getRouter() {
    return this.router;
  }
};
