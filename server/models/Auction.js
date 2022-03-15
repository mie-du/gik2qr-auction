const { DataTypes } = require('sequelize');
const { MODELS } = require('../../helpers/constants');
const { initLowercase } = require('../../helpers/formatting');
const ModelBase = require('./ModelBase');
module.exports = class Item extends ModelBase {
  constructor() {
    super(MODELS.AUCTION);
  }

  /* Interface: 
    startingPrice: DOUBLE req
    saleEnd: DATE req
    status: INTEGER enum
    fk: item
  */
  define(sequelize) {
    return sequelize.define(
      initLowercase(this.name),
      {
        startingPrice: {
          allowNull: false,
          type: DataTypes.DOUBLE
        },
        saleEnd: {
          allowNull: false,
          type: DataTypes.DATE
        },
        status: DataTypes.INTEGER
      },
      { ...this.db.opt }
    );
  }
};
