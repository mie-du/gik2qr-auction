import api from './api';

export default class ResourceModel {
  resourceUrl = '';
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  async getAll(extras = '') {
    const result = await api
      .get(`${this.resourceUrl}/${extras}`)
      .catch((e) => e.response);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return [];
  }

  async getById(id) {
    const result = await api.get(`${this.resourceUrl}/${id}`);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async update(resource) {
    const result = await api.put(this.resourceUrl, resource);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async create(resource) {
    const result = await api.post(this.resourceUrl, resource);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async remove(id) {
    const result = await api.delete(this.resourceUrl, { data: { id } });
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }
}
