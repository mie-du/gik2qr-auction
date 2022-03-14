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
      return this._createResponseValidationError(invalidData);
    }
    const user = await this.db.create(data);

    return this._createResponseSuccessObject(user);
  }
};
