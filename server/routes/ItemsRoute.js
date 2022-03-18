const { MODELS } = require('../../helpers/constants');
const AuctionService = require('../services/AuctionService');
const ItemService = require('../services/ItemService');
const RoutesBase = require('./RoutesBase');

class ItemsRoute extends RoutesBase {
  itemService = null;
  auctionServiced = null;
  constructor() {
    super(MODELS.ITEM);
    this.itemService = new ItemService();
    this.auctionService = new AuctionService();
    this.addCustomRoutes();
    this.addCrudRoutes();
  }

  addCustomRoutes() {
    this.router.post('/:id/addImage', (req, res) => {
      try {
        const id = req.params.id;
        const data = req.body;
        this.itemService.addImage(id, data).then((result) => res.send(result));
      } catch (e) {
        throw e;
      }
    });

    this.router.post('/:id/createAuction/', (req, res) => {
      try {
        const id = req.params.id;
        const data = req.body;
        this.auctionService
          .startAuctionForItem(id, data)
          .then((result) => res.send(result));
      } catch (e) {
        throw e;
      }
    });

    this.router.post('/:id/cancelAuction/', (req, res) => {
      try {
        const id = req.params.id;

        this.auctionService
          .cancelAuctionForItem(id)
          .then((result) => res.send(result));
      } catch (e) {
        throw e;
      }
    });

    this.router.get('/getSummary', (req, res) => {
      try {
        this.itemService.getSummary().then((result) => res.send(result));
      } catch (e) {
        throw e;
      }
    });
  }
}

module.exports = new ItemsRoute().getRouter();
