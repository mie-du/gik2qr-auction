const { DataTypes } = require('sequelize');
const ModelBase = require('./ModelBase');
module.exports = class Item extends ModelBase {
  constructor() {
    super('auction');
  }

  define(sequelize) {
    return sequelize.define(
      this.name,
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
