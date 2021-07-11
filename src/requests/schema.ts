import axios from 'axios'
import dayjs from 'dayjs'
import { DeviceRQ } from '.'

export default {
  async getAll() {
    const { data } = await axios.get('/api/schemas')
    console.log(data)
    return data
  },

  async get(id: string) {
    const { data } = await axios.get('/api/schemas/' + id)

    return data
  },

  async create(content: any, name = 'name', tags = ['tag1'], template = true) {
    const { data } = await axios.post('/api/schemas', {
      content,
      name,
    })

    return data
  },

  async update(schema: any, id: string) {
    const { data } = await axios.put('/api/schemas/' + id + '/' + schema.title, schema)

    return data
  },

  async delete(schema: any) {
    const { data } = await axios.delete('/api/schemas/' + schema.id + '/' + schema.schema.title)

    return data
  },
}

// export default {
//   async getAll() {
//     const { data } = await axios.get('/schemas')
//     return data
//   },

//   async get(id: string) {
//     const { data } = await axios.get('/schemas/' + id)

//     return data
//   },

//   async create(schema: any, name = '未命名类型', tags = ['tag1'], template = true) {
//     const { data } = await axios.post('/schemas', {
//       schema,
//     })

//     return data
//   },

//   async update(schema: any, id: string) {
//     const { data } = await axios.put('/schemas/' + id, schema)

//     return data
//   },

//   async delete(schema: any) {
//     const { data } = await axios.delete('/schemas/' + schema.id)

//     return data
//   },
// }
