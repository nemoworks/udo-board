import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async getAll() {
    const { data } = await axios.get('/mock/application')
    return data
  },

  async get(id: string) {
    const { data } = await axios.get('/mock/application/' + id)
    return data
  },

  async create(name = '未命名场景', devices = [], tags = []) {
    const { data } = await axios.post('/mock/application', {
      devices,
      tags,
      name,
      createOn: dayjs().format(),
    })

    return data
  },

  async update(application: any) {
    const { data } = await axios.put('/mock/application', application)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete('/mock/application/' + id)
    return data
  },
}
