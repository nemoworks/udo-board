import axios from 'axios'
import dayjs from 'dayjs'

const host = 'http://192.168.31.222:8080/api'
// const host=''

export default {
  async getAll() {
    const { data } = await axios.get(host + '/schemas')
    return data
  },

  async get(id: string) {
    const { data } = await axios.get(host + '/schemas/' + id)
    // console.log('data',data)
    return data
  },

  async create(content: any, name = '未命名模板', tags = ['tag1'], template = true) {
    const { data } = await axios.post(host + '/schemas', {
      content,
      //createOn: dayjs().format(),
    })
    return data
  },

  async update(schema: any, id: string) {
    const { data } = await axios.put(host + '/schemas/' + id, schema)
    // console.log(data)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete(host + '/schemas/' + id)
    return data
  },
}
