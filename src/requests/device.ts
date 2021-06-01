import { ContactsOutlined } from '@ant-design/icons'
import axios from 'axios'
import dayjs from 'dayjs'

const host = 'http://192.168.1.105:8080'
// const host=''

export default {
  async getAll(schemas: any) {
    const {
      schema: { title, properties },
      id,
    } = schema
    let response: string = ''
    for (var key in properties) {
      response = response + key + '\n'
    }
    const query = `
    {

    }
    `
  },

  async create(schema: any) {
    const {
      schema: { title, properties },
      id,
    } = schema
    let schemaContent: string = ''
    let response: string = ''
    for (var key in properties) {
      schemaContent = schemaContent + key + ': null\n'
      response = response + key + '\n'
    }

    const query = `
    {
      new${title}(
        content: {
        }
        udoTypeId: "${id}"
        uri : "http://localhost:8081/"
      ){
        udoi
      }
    }`

    console.log(query)
    const { data: res } = await axios.post(host + '/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    const data = res['new' + title]
    // for (let key in res)
    // {
    //   data=res[key]
    // }
    console.log(data)
    return data
  },

  async get(id: string, schema: any) {
    const { title, properties } = schema
    let response: string = ''
    for (var key in properties) {
      response = response + key + '\n'
    }
    const query =
      `
    {
      ${title}(udoi:"${id}"){
    ` +
      response +
      `}
    }
    `
    console.log(query)
    const { data: res } = await axios.post(host + '/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    const data = res['new' + title]
    console.log(data)
    return data
  },

  async update(device: any, id: string, schemaId: string, schema: any) {
    const { title, properties } = schema
    let response: string = ''
    for (var key in properties) {
      response = response + key + '\n'
    }
    const query =
      `
    {
      update${title}(
        udoi:${id}
        content: ` +
      JSON.stringify(device).replace(',', '') +
      `
        udoTypeId: "${schemaId}"
        uri : "http://localhost:8081/"
      ){` +
      response +
      `}
    }
    `
    console.log(query)
    const { data } = await axios.post(host + '/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    console.log(data)
    return data
  },

  async delete(id: string) {
    const query = `
    {
      deleteTest(udoi:${id}){
        udoi
      }
    }
    `
    console.log(query)
    const { data } = await axios.post(host + '/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    console.log(data)
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
