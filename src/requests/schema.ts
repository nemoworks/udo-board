import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async getAll() {
    const { data } = await axios.get('/mock/schema')
    return data
  },

  async get(id: string) {
    const { data } = await axios.get('/mock/schema/' + id)
    return data
  },

  async create(content: any, name = '未命名模板', tags = [], template = false) {
    const { data } = await axios.post('/mock/schema', {
      content,
      tags,
      name,
      template,
      createOn: dayjs().format(),
    })

    return data
  },

  async update(schema: any) {
    const { data } = await axios.put('/mock/schema', schema)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete('/mock/schema/' + id)
    return data
  },
}
