/* return await bcrypt.compareSync(password, hash); */
module.exports = class ServiceBase {
  db = null;
  constructor(model) {
    this.db = model;
  }

  async getAll() {
    return await this.db.findAll();
  }

  async getById(id) {
    return await this.db.findOne({ where: { id } });
  }

  async create(data) {
    try {
      if (!this._create) {
        return this._createResponseError(
          'The create method must be overridden.'
        );
      }

      return await this._create(data);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  _createResponseSuccessObject(data) {
    return { status: 200, data };
  }

  _createResponseError(message, status, stack) {
    return {
      status: status || 500,
      data: {
        error: { type: 'server', message: message || 'Okänt fel', stack }
      }
    };
  }
  _createResponseValidationError(invalidData) {
    return {
      status: 422,
      data: { error: { type: 'validation', invalidData } }
    };
  }
  _createResponseMessage(message, status = 200) {
    return { status, data: { message } };
  }
};
