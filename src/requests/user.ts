import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async getAll() {
    const { data } = await axios.get('/mock/user')
    return data
  },

  async get(id: string) {
    const { data } = await axios.get('/mock/user/' + id)
    return data
  },

  async create(name = '未命名客户', email = '', tags = []) {
    const { data } = await axios.post('/mock/user', {
      email,
      tags,
      name,
      createOn: dayjs().format(),
    })

    return data
  },

  async update(user: any) {
    const { data } = await axios.put('/mock/user', user)
    return data
  },

  async delete(id: string) {
    const { data } = await axios.delete('/mock/user/' + id)
    return data
  },
}
