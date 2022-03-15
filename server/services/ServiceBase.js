/* return await bcrypt.compareSync(password, hash); */
module.exports = class ServiceBase {
  resourceModel = null;

  constructor(model) {
    this.resourceModel = model;
  }

  async getAll() {
    try {
      const response = await this._getAll();
      if (!response) {
        return this._createResponseError('', 204);
      }
      return this._createResponseSuccessObject(response);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async getById(id) {
    try {
      const response = await this._getById(id);
      if (!response) {
        return this._createResponseError('', 204);
      }
      return this._createResponseSuccessObject(response);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async destroy(id) {
    try {
      if (!id) {
        return this._createResponseInputError('Du måste ange ett id.', 422);
      }
      const existingResource = await this.resourceModel.findOne({
        where: { id }
      });
      if (!existingResource) {
        return this._createResponseInputError(
          'Kunde inte hitta något objekt att ta bort.',
          404
        );
      }

      const result = await this.resourceModel.destroy({ where: { id } });
      if (!result)
        return this._createResponseError(
          'Kunde inte ta bort produkt, försök igen.'
        );
      return this._createResponseMessage('Objektet borttaget.');
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  /* Must be implemented by child */
  async create(data) {
    try {
      if (!this._create) {
        return this._createResponseError(
          "Can't use create method of base object. The create method must be overloaded."
        );
      }

      return await this._create(data);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async update(id, data) {
    try {
      if (!this._update) {
        return this._createResponseError(
          "Can't use update method of base object. The update method must be overloaded."
        );
      }
      if (!id) {
        return this._createResponseInputError('Du måste ange ett id.', 422);
      }
      const existingResource = await this.resourceModel.findOne({
        where: { id }
      });
      if (!existingResource) {
        return this._createResponseInputError(
          'Kunde inte hitta objekt att uppdatera.',
          404
        );
      }

      return await this._update(id, data);
    } catch (e) {
      return this._createResponseError(e.message, e.status, e.stack);
    }
  }

  async _getAll() {
    return await this.resourceModel.findAll();
  }
  async _getById(id) {
    return await this.resourceModel.findOne({ where: { id } });
  }

  /* Response helpers */
  _createResponseSuccessObject(data) {
    return { status: 200, data };
  }

  _createResponseError(message, status, stack) {
    return {
      status: status || 500,
      data: {
        error: { message: message || 'Okänt fel', stack }
      }
    };
  }

  _createResponseInputError(invalidData, status = 400) {
    return {
      status,
      data: { error: { invalidData } }
    };
  }

  _createResponseMessage(message, status = 200) {
    return { status, data: { message } };
  }
};
