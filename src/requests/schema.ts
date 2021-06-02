import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async getAll() {
    const { data } = await axios.get('/api/schemas')
    console.log(data)
    return data
  },

  async get(id: string) {
    const { data } = await axios.get('/api/schemas/' + id)
    console.log(data)
    return data
  },

  async createFromUrl(uri: string) {
    const { data } = await axios.post('/api/documents?uri=' + uri)
    console.log(data)
    return data
  },

  async create(content: any, name = '未命名模板', tags = ['tag1'], template = true) {
    const { data } = await axios.post('/api/schemas', {
      content,
    })
    console.log(data)
    return data
  },

  async update(schema: any, id: string) {
    const { data } = await axios.put('/api/schemas/' + id, schema)
    console.log(data)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete('/api/schemas/' + id)
    console.log(data)
    return data
  },
}
