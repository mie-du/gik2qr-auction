const ServiceBase = require('./ServiceBase');
const Item = require('../models/Item');
const db = require('../models');
const validate = require('validate.js');
const { Op } = require('sequelize');
const { AUCTION_STATUS } = require('../../helpers/constants');

/* return await bcrypt.compareSync(password, hash); */
module.exports = class ItemService extends ServiceBase {
  item = null;
  db = null;
  constructor() {
    super(db.item);
    this.db = db;
    this.item = new Item();
    this.constraints = this.item.getValidation();
  }

  async addImage(id, itemImage) {
    try {
      if (!id) {
        return this._createResponseInputError('Du måste ange ett id.', 422);
      }

      const existingItem = await this.db.item.findOne({
        where: { id },
        include: [db.itemImage]
      });

      if (!existingItem) {
        return this._createResponseInputError(
          'Produkten du försöker lägga till bild på finns inte.',
          404
        );
      }

      const newImage = await existingItem.createItemImage(itemImage);

      if (!existingItem.mainImage) {
        existingItem.update({ mainImage: newImage.id }, { where: { id } });
      }
      return this._createResponseSuccessObject(newImage);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async getSummary() {
    let items = await this.resourceModel.findAll({
      include: [db.itemImage, db.user, db.auction]
    });
    const summarizedItems = items.map(async (item) => {
      const mainImage = await db.itemImage.findOne({
        where: { id: item.mainImage }
      });
      const activeAuction = await db.auction.findOne({
        where: {
          [Op.and]: [{ itemId: item.id }, { status: AUCTION_STATUS.ACTIVE }]
        }
      });

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        auction: activeAuction,
        seller: {
          name: `${item.user.firstName} ${item.user.lastName}`,
          imageUrl: item.user.imageUrl
        },
        mainImageUrl: mainImage?.imageUrl || null
      };
    });

    return await Promise.all(summarizedItems);
  }

  async _getById(id) {
    return await this.db.item.findOne({
      where: { id },
      include: [db.itemImage, db.user, db.auction]
    });
  }

  async _getAll() {
    return await this.db.item.findAll({
      include: [db.itemImage, db.user, { model: db.auction, include: [db.bid] }]
    });
  }

  async _create(data) {
    const invalidData = validate(data, this.constraints);
    if (invalidData) {
      return this._createResponseInputError(invalidData, 442);
    }
    const newItem = await this.db.item.create(data);
    if (!newItem) {
      return this._createResponseError(
        'Kunde inte skapa produkt, försök igen.'
      );
    }
    return this._createResponseSuccessObject(newItem);
  }

  async _update(id, data) {
    const invalidData = validate(data, this.constraints);
    if (invalidData) {
      return this._createResponseInputError(invalidData, 442);
    }
    const updatedItem = await this.db.item.update(data, { where: { id } });
    if (updatedItem[0]) {
      return this._createResponseMessage('Produkten uppdaterades.');
    }
    return this._createResponseError(
      'Kunde inte uppdatera produkten, försök igen.'
    );
  }
};
