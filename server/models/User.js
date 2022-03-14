const ModelBase = require('./ModelBase');
const bcrypt = require('bcrypt');
module.exports = class User extends ModelBase {
  constructor() {
    super('user');
  }

  define(sequelize) {
    return sequelize.define(
      this.name,
      {
        firstName: { ...this.db.columns.stringShort },
        lastName: { ...this.db.columns.stringShort },
        username: { ...this.db.columns.stringShort },
        email: { ...this.db.columns.email },
        password: { ...this.db.columns.stringLong }
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

  getValidation() {
    return {
      firstName: {
        length: {
          ...this.val.str.short,
          tooShort: `^Fältet "Förnamn" ${this.val.tooShort}`,
          tooLong: `^Fältet "Förnamn" ${this.val.tooLong}`
        }
      },
      lastName: {
        length: {
          ...this.val.str.short,
          tooShort: `^Fältet "Efternamn" ${this.val.tooShort}`,
          tooLong: `^Fältet "Efternamn" ${this.val.tooLong}`
        }
      },
      username: {
        length: {
          ...this.val.str.short,
          tooShort: `^Användarnamnet ${this.val.tooShort}`,
          tooLong: `^Användarnamnet" ${this.val.tooLong}`
        }
      },
      password: {
        length: {
          tooShort: `^Lösenordet`
        }
      }
    };
  }
};
