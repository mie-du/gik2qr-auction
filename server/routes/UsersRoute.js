const { MODELS } = require('../../helpers/constants');
const RoutesBase = require('./RoutesBase');

class UsersRoute extends RoutesBase {
  constructor() {
    super(MODELS.USER);
    this.addGetRoute();
    this.addGetByIdRoute();
    this.addCreateRoute();
  }
}

module.exports = new UsersRoute().getRouter();
