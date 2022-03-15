const { MODELS } = require('../../helpers/constants');

const AuctionService = require('../services/AuctionService');
const RoutesBase = require('./RoutesBase');

class ItemsRoute extends RoutesBase {
  itemService = null;
  constructor() {
    super(MODELS.AUCTION);
    this.auctionService = new AuctionService();

    this.addCrudRoutes();
  }

  addCustomRoutes() {
    /*     this.router.post('/:id/addImage', (req, res) => {
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
    }); */
  }
}

module.exports = new ItemsRoute().getRouter();
