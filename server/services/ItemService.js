const ServiceBase = require('./ServiceBase');
const Item = require('../models/Item');
const db = require('../models');
const validate = require('validate.js');
const { Op } = require('sequelize');

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

  async startAuction(id, auction) {
    const item = await db.item.findOne({ where: { id } });
    const ongoingAuction = await this._getOngoingAuction(item);
    if (ongoingAuction) {
      return this._createResponseInputError(
        'Det finns redan en pågående auktion för denna produkt.'
      );
    }
    const newAuction = await item.createAuction(auction);
    if (!newAuction) {
      return this._createResponseError(
        'Kunde inte skapa produkt, försök igen.'
      );
    }
    return this._createResponseSuccessObject(newAuction);
  }

  async cancelAuction(id, status) {
    const item = await db.item.findOne({ where: { id } });
    const ongoingAuction = await this._getOngoingAuction(item);
    if (!ongoingAuction) {
      return this._createResponseInputError(
        'Det finns finns ingen pågående auktion att avsluta.'
      );
    }
    await ongoingAuction.update({ status });
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
    const items = await this.resourceModel.findAll({
      include: [db.itemImage, db.user]
    });

    const summarizedItems = items.map(async (item) => {
      const mainImage = await db.itemImage.findOne({
        where: { id: item.mainImage }
      });

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        seller: {
          name: `${item.user.firstName} ${item.user.lastName}`,
          imageUrl: item.user.imageUrl
        },
        mainImageUrl: mainImage?.imageUrl || null
      };
    });

    return await Promise.all(summarizedItems);
  }

  async _getOngoingAuction(item) {
    const ongoingAuction = await item.getAuctions({
      where: { saleEnd: { [Op.gt]: new Date() } }
    });
    return ongoingAuction[0];
  }

  async _getById(id) {
    return await this.db.item.findOne({
      where: { id },
      include: [db.itemImage, db.user, db.auction]
    });
  }

  async _getAll() {
    return await this.db.item.findAll({
      include: [db.itemImage, db.user, db.auction]
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
