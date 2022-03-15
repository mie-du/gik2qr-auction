const { DataTypes } = require('sequelize');
const { MODELS } = require('../../helpers/constants');
const ModelBase = require('./ModelBase');
const { initLowercase } = require('../../helpers/formatting');
module.exports = class Item extends ModelBase {
  constructor() {
    super(MODELS.ITEM);
  }

  /* Interface: 
    title: STRING(50) req
    description: DataTypes.TEXT
  */

  define(sequelize) {
    return sequelize.define(
      initLowercase(this.name),
      {
        title: { ...this.db.columns.stringShortReq },
        description: DataTypes.TEXT,
        mainImage: { type: DataTypes.INTEGER }
      },
      { ...this.db.opt }
    );
  }

  getValidation() {
    return {
      title: {
        length: {
          ...this.val.str.short,
          tooShort: `^Fältet "Titel" ${this.val.str.tooShort}`,
          tooLong: `^Fältet "Titel": ${this.val.str.tooLong}`
        }
      }
    };
  }
};
