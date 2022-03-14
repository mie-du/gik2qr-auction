const { DataTypes } = require('sequelize');
const ModelBase = require('./ModelBase');
module.exports = class Item extends ModelBase {
  constructor() {
    super('bid');
  }

  define(sequelize) {
    return sequelize.define(
      this.name,
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
