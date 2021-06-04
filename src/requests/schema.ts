import axios from 'axios'
import dayjs from 'dayjs'

const host = 'http://192.168.31.222:8080'

export default {
  async getAll() {
    // console.log("getall")
    const { data } = await axios.get(host + '/api/schemas')
    console.log(data)
    return data
  },

  async get(id: string) {
    const { data } = await axios.get(host + '/api/schemas/' + id)
    console.log(data)
    return data
  },

  async createFromUrl(uri: string) {
    const { data } = await axios.post(host + '/api/documents?uri=' + uri)
    console.log(data)
    return data
  },

  async create(content: any, name = '未命名模板', tags = ['tag1'], template = true) {
    const { data } = await axios.post(host + '/api/schemas', {
      content,
    })
    console.log(data)
    return data
  },

  async update(schema: any, id: string) {
    const { data } = await axios.put(host + '/api/schemas/' + id, schema)
    console.log(data)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete(host + '/api/schemas/' + id)
    console.log(data)
    return data
  },
}
