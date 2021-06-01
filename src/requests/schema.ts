import axios from 'axios'
import dayjs from 'dayjs'

const host = 'http://192.168.1.105:8080'
// const host=''

export default {
  async getAll() {
    const { data } = await axios.get(host + '/api/schemas')
    // console.log(data)
    return data
  },

  async get(id: string) {
    const { data } = await axios.get(host + '/api/schemas/' + id)
    // console.log('data',data)
    return data
  },

  async createFromUrl(url: string) {
    const { data } = await axios.post(host + '/api/??????', url)
    return data
  },

  async create(content: any, name = '未命名模板', tags = ['tag1'], template = true) {
    const { data } = await axios.post(host + '/api/schemas', {
      content,
    })
    return data
  },

  async update(schema: any, id: string) {
    const { data } = await axios.put(host + '/api/schemas/' + id, schema)
    // console.log(data)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete(host + '/api/schemas/' + id)
    return data
  },
}
