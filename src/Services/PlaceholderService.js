import axios from 'axios'

import { config } from 'Config'

class PlaceholderService {
  constructor() {
    this.client = axios.create({ baseURL: `${config.placeholderService.baseUrl}`, timeout: 10000 })
  }

  async getTasks(query) {
    return await this.client.get(`/todos${query}`)
  }

  async deleteTask(id) {
    return await this.client.delete(`/todos/${id}`)
  }

  async getUsers(query) {
    return await this.client.get(`/users${query}`)
  }

  async deleteUser(id) {
    return await this.client.delete(`/users/${id}`)
  }
}

export default PlaceholderService
