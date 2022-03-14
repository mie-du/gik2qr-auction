const { DataTypes } = require('sequelize');
const { MODELS } = require('../../helpers/constants');
const ModelBase = require('./ModelBase');
const { initLowercase } = require('../../helpers/formatting');
module.exports = class Item extends ModelBase {
  constructor() {
    super(MODELS.ITEM);
  }

  define(sequelize) {
    return sequelize.define(
      initLowercase(this.name),
      {
        title: { ...this.db.columns.stringShort },
        description: DataTypes.TEXT
      },
      { ...this.db.opt }
    );
  }

  getValidation() {
    return {
      title: {
        length: {
          ...val.str.short,
          tooShort: `^Fältet "Titel" ${val.tooShort}`,
          tooLong: `^Fältet "Titel": ${val.tooLong}`
        }
      }
    };
  }
};
