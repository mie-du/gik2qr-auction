const ModelBase = require('./ModelBase');
const bcrypt = require('bcrypt');
const { MODELS } = require('../../helpers/constants');
const { initLowercase } = require('../../helpers/formatting');
module.exports = class User extends ModelBase {
  constructor() {
    super(MODELS.USER);
  }
  /* Interface
    firstName: STRING(50) req
    lastName: STRING(50) req
    email: STRING(255) req, 
    password: STRING(64) encrypted req
    username: STRING(50),
    imageUrl: STRING(255),
    bio: STRING(1000)
*/
  getValidation() {
    return {
      firstName: {
        length: {
          ...this.val.str.short,
          tooShort: `^Fältet "Förnamn" ${this.val.str.tooShort}`,
          tooLong: `^Fältet "Förnamn" ${this.val.str.tooLong}`
        }
      },
      lastName: {
        length: {
          ...this.val.str.short,
          tooShort: `^Fältet "Efternamn" ${this.val.str.tooShort}`,
          tooLong: `^Fältet "Efternamn" ${this.val.str.tooLong}`
        }
      },
      username: {
        length: {
          ...this.val.str.short,
          tooShort: `^Användarnamnet ${this.val.str.tooShort}`,
          tooLong: `^Användarnamnet ${this.val.str.tooLong}`
        }
      },
      password: {
        length: {
          minimum: 8,
          tooShort: `^Lösenordet måste vara minst %count tecken långt.`
        }
      }
    };
  }

  define(sequelize) {
    return sequelize.define(
      initLowercase(this.name),
      {
        firstName: { ...this.db.columns.stringShortReq },
        lastName: { ...this.db.columns.stringShortReq },
        email: { allowNull: false, ...this.db.columns.email },
        password: { ...this.db.columns.encrypted },
        username: { ...this.db.columns.stringShort },
        imageUrl: { ...this.db.columns.url },
        biography: { ...this.db.columns.stringLong }
      },
      {
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              const salt = await bcrypt.genSaltSync(10, 'a');
              user.password = bcrypt.hashSync(user.password, salt);
            }
          },
          beforeUpdate: async (user) => {
            if (user.password) {
              const salt = await bcrypt.genSaltSync(10, 'a');
              user.password = bcrypt.hashSync(user.password, salt);
            }
          }
        },
        ...this.db.opt
      }
    );
  }
};
