const ServiceBase = require('./ServiceBase');
const Auction = require('../models/Auction');
const db = require('../models');
const validate = require('validate.js');

/* return await bcrypt.compareSync(password, hash); */
module.exports = class AuctionService extends ServiceBase {
  auction = null;
  db = null;
  constructor() {
    super(db.auction);
    this.db = db;
    this.auction = new Auction();
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

    if (response[0]) {
      return this._createResponseMessage('Användaren uppdaterades.');
    }
    return this._createResponseError(
      'Kunde inte uppdatera användare, försök igen.'
    );
  }
};
