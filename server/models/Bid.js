const { DataTypes } = require('sequelize');
const { MODELS } = require('../../helpers/constants');
const ModelBase = require('./ModelBase');
const { initLowercase } = require('../../helpers/formatting');
module.exports = class Item extends ModelBase {
  constructor() {
    super(MODELS.BID);
  }

  define(sequelize) {
    return sequelize.define(
      initLowercase(this.name),
      {
        amount: {
          allowNull: false,
          type: DataTypes.DOUBLE
        }
      },
      { ...this.db.opt }
    );
  }
};
