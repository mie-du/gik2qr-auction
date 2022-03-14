const { DataTypes } = require('sequelize');
const { MODELS } = require('../../helpers/constants');
const { initLowercase } = require('../../helpers/formatting');
const ModelBase = require('./ModelBase');
module.exports = class Item extends ModelBase {
  constructor() {
    super(MODELS.ITEM_IMAGE);
  }

  define(sequelize) {
    return sequelize.define(
      initLowercase(this.name),
      {
        imageUrl: { ...this.db.columns.url },
        main: DataTypes.BOOLEAN
      },

      { ...this.db.opt }
    );
  }
  getValidation() {
    return {
      imageUrl: {
        url: this.val.url.message,
        length: { ...this.val.url.length }
      }
    };
  }
};
