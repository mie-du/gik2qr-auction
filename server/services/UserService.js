const ServiceBase = require('./ServiceBase');
const User = require('../models/User');
const db = require('../models');
const validate = require('validate.js');

/* return await bcrypt.compareSync(password, hash); */
module.exports = class UserService extends ServiceBase {
  user = null;
  constructor() {
    super(db.user);
    this.user = new User();
    this.constraints = this.user.getValidation();
  }

  async _create(data) {
    const invalidData = validate(data, this.constraints);
    if (invalidData) {
      return this._createResponseInputError(invalidData, 442);
    }
    const user = await this.db.create(data);
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
    const response = await this.db.update(data, {
      where: { id }
    });
    console.log(response);
    if (response[0]) {
      return this._createResponseMessage('Användaren uppdaterades.');
    }
    return this._createResponseError(
      'Kunde inte uppdatera användare, försök igen.'
    );
  }
};
