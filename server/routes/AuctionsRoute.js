const { MODELS } = require('../../helpers/constants');

const AuctionService = require('../services/AuctionService');
const RoutesBase = require('./RoutesBase');
const db = require('../models');
const { Op } = require('sequelize');

class ItemsRoute extends RoutesBase {
  itemService = null;
  constructor() {
    super(MODELS.AUCTION);
    this.auctionService = new AuctionService();

    this.addCrudRoutes();
    this.addCustomRoutes();
  }

  addCustomRoutes() {
    this.router.get('/:id/currentAuction', (req, res) => {
      const id = req.params.id;

      db.auction
        .findOne({
          where: db.Sequelize.and({ saleEnd: { [Op.gt]: new Date() } }, { id })
        })
        .then((result) => {
          console.log('now', new Date());
          console.log('end', result?.saleEnd);
          res.send(result);
        });
    });

    this.router.post('/:id/addBid', (req, res) => {
      try {
        const id = req.params.id;
        const bid = req.body.amount;

        this.auctionService
          .addBid(id, bid)
          .then((result) => res.status(result.status).json(result.data));
      } catch (e) {
        throw e;
      }
    });

    this.router.put('/:id/:status', (req, res) => {
      try {
        const id = req.params.id;
        const status = req.params.status;

        this.auctionService
          .setAuctionStatus(id, status)
          .then((result) => res.status(result.status).json(result.data));
      } catch (e) {
        throw e;
      }
    });
  }
}

module.exports = new ItemsRoute().getRouter();
