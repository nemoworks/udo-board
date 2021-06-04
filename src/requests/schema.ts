import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async getAll() {
    const { data } = await axios.get('/api/schemas')

    return data
  },

  async get(id: string) {
    const { data } = await axios.get('/api/schemas/' + id)

    return data
  },

  async createFromUrl(uri: string) {
    const { data } = await axios.post('/api/documents?uri=' + uri)

    return data
  },

  async create(content: any, name = '未命名模板', tags = ['tag1'], template = true) {
    const { data } = await axios.post('/api/schemas', {
      content,
    })

    return data
  },

  async update(schema: any, id: string) {
    const { data } = await axios.put('/api/schemas/' + id, schema)

    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete('/api/schemas/' + id)

    return data
  },
}
