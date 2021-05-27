import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async getAll() {
    const { data } = await axios.get('/mock/device')
    return data
  },

  async get(id: string) {
    const { data } = await axios.get('/mock/device/' + id)
    return data
  },

  async create(content: any, schema: string, user = null, name = '未命名设备', tags = []) {
    const { data } = await axios.post('/mock/device', {
      content,
      tags,
      name,
      user,
      schema,
      createOn: dayjs().format(),
    })

    return data
  },

  async update(device: any) {
    const { data } = await axios.put('/mock/device', device)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete('/mock/device/' + id)
    return data
  },
}
