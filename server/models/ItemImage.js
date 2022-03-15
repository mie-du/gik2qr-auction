const { DataTypes } = require('sequelize');
const { MODELS } = require('../../helpers/constants');
const { initLowercase } = require('../../helpers/formatting');
const ModelBase = require('./ModelBase');
module.exports = class Item extends ModelBase {
  constructor() {
    super(MODELS.ITEM_IMAGE);
  }

  /* Interface: 
    imageUrl: STRING(255) req
    main: BOOL req
    fk: Item
  */
  define(sequelize) {
    return sequelize.define(
      initLowercase(this.name),
      {
        imageUrl: { allowNull: false, ...this.db.columns.url }
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
