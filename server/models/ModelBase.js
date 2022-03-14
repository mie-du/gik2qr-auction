const { DataTypes } = require('sequelize');
const { LENGTH } = require('../../helpers/constants');

module.exports = class ModelBase {
  name = 'unknown';
  constructor(name) {
    this.name = name;
  }
  val = {
    str: {
      tooShort: 'måste innehålla minst %count tecken.',
      tooLong: 'får innehålla maximalt %count tecken.',
      long: {
        minimum: LENGTH.MIN,
        maximum: LENGTH.MAX_LONG
      },
      short: {
        minimum: LENGTH.MIN,
        maximum: LENGTH.MAX_SHORT
      }
    },

    email: {
      message: '^E-postadressen är i ett felaktigt format.',
      length: {
        min: 4,
        max: 255
      }
    },
    url: {
      message: '^Sökvägen är i ett felaktigt format.',
      length: {
        min: 6,
        max: 255
      }
    }
  };
  db = {
    columns: {
      stringLong: {
        type: DataTypes.STRING(LENGTH.MAX_LONG),
        allowNull: false,
        validation: {
          len: [LENGTH.MIN, LENGTH.MAX_LONG]
        }
      },
      stringShort: {
        type: DataTypes.STRING(LENGTH.MAX_SHORT),
        allowNull: false,
        validation: {
          len: [LENGTH.MIN, LENGTH.MAX_SHORT]
        }
      },
      email: {
        type: DataTypes.STRING(LENGTH.MAX_WEB),
        validation: {
          isEmail: true,
          len: [LENGTH.MIN_WEB, LENGTH.MAX_WEB]
        }
      },
      url: {
        type: DataTypes.STRING(LENGTH.MAX_WEB),
        validation: {
          isUrl: true,
          len: [LENGTH.MIN_WEB, LENGTH.MAX_WEB]
        }
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i
      }
    },
    opt: {
      underscored: true
    }
  };
  getName() {
    return this.name;
  }
};
