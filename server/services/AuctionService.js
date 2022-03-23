const ServiceBase = require('./ServiceBase');
const Auction = require('../models/Auction');
const db = require('../models');
const { Op } = require('sequelize');
const { AUCTION_STATUS } = require('../../helpers/constants');

/* return await bcrypt.compareSync(password, hash); */
module.exports = class AuctionService extends ServiceBase {
  auction = null;
  db = null;
  constructor() {
    super(db.auction);
    this.db = db;
    this.auction = new Auction();
  }

  async startAuctionForItem(itemId, auction) {
    try {
      const item = await db.item.findOne({ where: { id: itemId } });
      const ongoingAuction = await this._getOngoingAuctionForItem(item);
      if (ongoingAuction) {
        return this._createResponseInputError(
          'Det finns redan en pågående auktion för denna produkt.'
        );
      }

      auction.status = AUCTION_STATUS.ACTIVE;
      const newAuction = await item.createAuction(auction);
      if (!newAuction) {
        return this._createResponseError(
          'Kunde inte skapa auktion, försök igen.'
        );
      }
      return this._createResponseSuccessObject(newAuction);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async cancelAuctionForItem(itemId) {
    try {
      const item = await db.item.findOne({ where: { id: itemId } });
      const ongoingAuction = await this._getOngoingAuctionForItem(item);
      if (!ongoingAuction) {
        return this._createResponseInputError(
          'Det finns finns ingen pågående auktion att avsluta.'
        );
      }
      const response = await db.auction.update(
        { status: AUCTION_STATUS.CANCELLED },
        { where: { itemId } }
      );
      if (!response[0]) {
        return this._createResponseError(
          'Kunde inte uppdatera auktion, försök igen.'
        );
      }
      return this._createResponseMessage('Auktionen uppdaterades.');
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async setAuctionStatus(auctionId, status) {
    try {
      if (!auctionId || !status) {
        return this._createResponseInputError(
          'Du måste ange både auktionsid och önskad status.'
        );
      }
      if (Object.values(AUCTION_STATUS).indexOf(status) < 0) {
        return this._createResponseInputError('Ogiltig status.');
      }
      const response = db.auction.update(
        { status },
        { where: { id: auctionId } }
      );

      if (!response[0]) {
        return this._createResponseError(
          'Kunde inte sätta auktionsstatus, försök igen.'
        );
      }
      return this._createResponseMessage('Auktionsstatus uppdaterades.');
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async addBid(auctionId, bid) {
    try {
      if (!auctionId || !bid) {
        return this._createResponseInputError(
          'Du måste ange både auktionsid och önskat bud.'
        );
      }
      const currentAuction = await db.auction.findOne({
        where: db.Sequelize.and(
          { saleEnd: { [Op.gt]: new Date() } },
          { id: auctionId }
        )
      });

      if (!currentAuction) {
        return this._createResponseInputError(
          'Kunde inte hitta pågående auktion att lägga bud på.'
        );
      }
      const highestBid = await this._getHighestBid(currentAuction);
      console.log(highestBid);
      console.log(bid);
      if (bid <= currentAuction.startingPrice || bid <= highestBid) {
        return this._createResponseInputError('Budet är för lågt.');
      }

      const result = await currentAuction.createBid({ amount: bid, userId: 2 });

      return this._createResponseMessage(`Budet ${bid} är registrerat`);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async getLatestBid(auctionId) {}

  async _getHighestBid(auction) {
    const bids = await auction.getBids({ order: [['amount', 'DESC']] });

    return bids[0]?.amount;
  }
  async _getOngoingAuctionForItem(item) {
    const ongoingAuctions = await item.getAuctions({
      where: { saleEnd: { [Op.gt]: new Date() } }
    });

    return ongoingAuctions[0];
  }

  async _getAll() {
    try {
      const response = await db.auction.findAll({ include: [db.item, db.bid] });
      if (response.length === 0) {
        return this._createResponseError('', 204);
      }
      return this._createResponseSuccessObject(response);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async _create(data) {
    const auction = await this.db.auction.create(data);
    if (!auction) {
      return this._createResponseError(
        'Kunde inte skapa användare, försök igen.'
      );
    }
    return this._createResponseSuccessObject(auction);
  }

  async _update(id, data) {
    const response = await this.db.auction.update(data, {
      where: { id }
    });

    if (!response[0]) {
      return this._createResponseError(
        'Kunde inte uppdatera auktionen, försök igen.'
      );
    }
    return this._createResponseMessage('Auktionen uppdaterades.');
  }
};
