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
        minimum: 4,
        maximum: 255
      }
    },
    url: {
      message: '^Sökvägen är i ett felaktigt format.',
      length: {
        minimum: 6,
        maximum: 255
      }
    }
  };
  stringLong = {
    type: DataTypes.STRING(LENGTH.MAX_LONG),
    validation: {
      len: [LENGTH.MIN, LENGTH.MAX_LONG]
    }
  };
  stringShort = {
    type: DataTypes.STRING(LENGTH.MAX_SHORT),
    validation: {
      len: [LENGTH.MIN, LENGTH.MAX_SHORT]
    }
  };
  db = {
    columns: {
      stringLong: {
        ...this.stringLong
      },
      stringLongReq: {
        allowNull: false,
        ...this.stringLong
      },
      stringShort: {
        ...this.stringShort
      },
      stringShortReq: {
        allowNull: false,
        ...this.stringShort
      },
      encrypted: {
        type: DataTypes.STRING(64),
        allowNull: false
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
