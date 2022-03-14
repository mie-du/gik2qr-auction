const { DataTypes } = require('sequelize');
const ModelBase = require('./ModelBase');
module.exports = class Item extends ModelBase {
  constructor() {
    super('itemImage');
  }

  define(sequelize) {
    return sequelize.define(
      this.name,
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
