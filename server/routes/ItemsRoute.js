const { MODELS } = require('../../helpers/constants');

const ItemService = require('../services/ItemService');
const RoutesBase = require('./RoutesBase');

class ItemsRoute extends RoutesBase {
  itemService = null;
  constructor() {
    super(MODELS.ITEM);
    this.itemService = new ItemService();
    this.addCustomRoutes();
    this.addCrudRoutes();
  }

  addCustomRoutes() {
    this.router.post('/:id/addImage', (req, res) => {
      const id = req.params.id;
      const data = req.body;
      this.itemService.addImage(id, data).then((result) => res.send(result));
    });

    this.router.post('/:id/createAuction', (req, res) => {
      const id = req.params.id;
      const data = req.body;
      this.itemService
        .createAuction(id, data)
        .then((result) => res.send(result));
    });

    this.router.get('/summary', (req, res) => {
      this.itemService.getSummary().then((result) => res.send(result));
    });
  }
}

module.exports = new ItemsRoute().getRouter();
