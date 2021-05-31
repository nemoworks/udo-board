import { ContactsOutlined } from '@ant-design/icons'
import axios from 'axios'
import dayjs from 'dayjs'

const host = 'http://172.27.143.202:8080/api'
// const host=''

export default {
  async create(schema: any) {
    console.log(schema)
    const {
      schema: { title },
    } = schema
    const { id } = schema
    const query = `{
      new${title}(
        content: {
          name: "abcd"
        }
        udoTypeId: "${id}"
        uri : "http://localhost:8081/"
      ){
        udoi
        name
      }
    }`

    console.log(query)
    const { data } = await axios.post(host + '/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    console.log(data)
    return data
  },

  async getAll() {
    const { data } = await axios.get('/mock/device')
    return data
  },

  async get(id: string) {
    const query = `{
      {
        udoi
        name
      }
    }`
    const { data } = await axios.post(host + '/documents/query', query)
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

// export default {
//   async getAll() {
//     const { data } = await axios.get('/mock/device')
//     return data
//   },

//   async get(id: string) {
//     const { data } = await axios.get('/mock/device/' + id)
//     return data
//   },

//   async create(content: any, schema: string, user = null, name = '未命名设备', tags = []) {
//     const { data } = await axios.post('/mock/device', {
//       content,
//       tags,
//       name,
//       user,
//       schema,
//       createOn: dayjs().format(),
//     })

//     return data
//   },

//   async update(device: any) {
//     const { data } = await axios.put('/mock/device', device)
//     return data
//   },

//   async delete(id: string) {
//     const { data } = await axios.delete('/mock/device/' + id)
//     return data
//   },
// }
