const { DataTypes } = require('sequelize');
const ModelBase = require('./ModelBase');
module.exports = class Item extends ModelBase {
  constructor() {
    super('item');
  }

  define(sequelize) {
    return sequelize.define(
      this.name,
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
