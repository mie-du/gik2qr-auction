const ServiceBase = require('./ServiceBase');
const User = require('../models/User');
const db = require('../models');
const validate = require('validate.js');

/* return await bcrypt.compareSync(password, hash); */
module.exports = class UserService extends ServiceBase {
  user = null;
  db = null;
  constructor() {
    super(db.user);
    this.db = db;
    this.user = new User();
    this.constraints = this.user.getValidation();
  }

  async _create(data) {
    const invalidData = validate(data, this.constraints);
    if (invalidData) {
      return this._createResponseInputError(invalidData, 442);
    }
    const user = await this.db.user.create(data);
    if (!user) {
      return this._createResponseError(
        'Kunde inte skapa användare, försök igen.'
      );
    }
    return this._createResponseSuccessObject(user);
  }

  async _update(id, data) {
    const invalidData = validate(data, this.constraints);
    if (invalidData) {
      return this._createResponseInputError(invalidData, 442);
    }
    const response = await this.db.user.update(data, {
      where: { id }
    });

    if (response[0]) {
      return this._createResponseMessage('Användaren uppdaterades.');
    }
    return this._createResponseError(
      'Kunde inte uppdatera användare, försök igen.'
    );
  }
};
