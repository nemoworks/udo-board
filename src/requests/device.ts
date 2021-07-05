import axios from 'axios'
import dayjs from 'dayjs'

// export default {
//   async getAll(schemas: any[]) {
//     let data: any[] = []
//     for (let schema of schemas) {
//       const {
//         schema: { title, properties },
//         id,
//       } = schema
//       const response = Object.keys(properties).join('\n')
//       const query = `
//       {
//         ${title}Documents(
//           udoTypeId: "${id}"
//         ){
//           udoi
//           ${response}
//         }
//       }`

//       const { data: res } = await axios.post('/api/documents/query', query, {
//         headers: {
//           'Content-Type': 'text/plain',
//         },
//       })

//       const r = res[title + 'Documents']
//       for (let i of r) {
//         data.push({ ...i, schema })
//       }
//     }

//     return data
//   },

//   async create(schema: any) {
//     const {
//       schema: { title, properties },
//       id,
//     } = schema

//     const query = `
//       {
//         new${title}(
//           content: {
//           }
//           udoTypeId: "${id}"
//           uri : "http://localhost:8081/"
//         ){
//           udoi
//         }
//       }
//     `

//     const { data: res } = await axios.post('/api/documents/query', query, {
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     })

//     const data = res['new' + title]
//     return data
//   },

//   async getById(id: string) {
//     const { data } = await axios.get('/api/documents/' + id)

//     return data
//   },

//   async get(id: string, schema: any) {
//     const { title, properties } = schema

//     const response = Object.keys(properties).join('\n')

//     const query = `
//       {
//         ${title}(udoi:"${id}"){
//           ${response}
//         }
//       }
//     `

//     const { data: res } = await axios.post('/api/documents/query', query, {
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     })

//     const data = res[title]
//     return data
//   },

//   async update(content: any, id: string, schemaId: string, schema: any) {
//     const { title, properties } = schema

//     const response = Object.keys(properties).join('\n')
//     let request = JSON.stringify(content).replace(',', '')
//     for (let key in properties) {
//       request = JSON.stringify(content).replace('"' + key + '"', key)
//     }
//     const query = `
//       {
//         update${title}(
//           udoi:"${id}"
//           content: ${request}
//           udoTypeId: "${schemaId}"
//           uri : "http://localhost:8081/"
//         ){
//           ${response}
//         }
//       }
//     `

//     const { data: res } = await axios.post('/api/documents/query', query, {
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     })

//     const data = res[title]
//     return data
//   },

//   async delete(device: any) {
//     const {
//       udoi,
//       schema: {
//         schema: { title },
//       },
//     } = device
//     const query = `
//       {
//         delete${title}(udoi:"${udoi}"){
//           deleteResult
//         }
//       }
//     `

//     const { data } = await axios.post('/api/documents/query', query, {
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     })

//     return data
//   },
// }

export default {
  async getAll(schemas: any[]) {
    let data: any[] = []
    for (let schema of schemas) {
      const { id } = schema

      const { data: res } = await axios.request({
        method: 'GET',
        url: '/mock/device',
        params: {
          schemaId: id,
        },
      })

      for (let i of res) {
        data.push({ ...i, schema })
      }
    }
    return data
  },

  async create(schema: any) {
    const { id } = schema

    const { data } = await axios.request({
      method: 'POST',
      url: '/mock/device',
      data: { ...schema },
    })
    return data
  },

  async getById(id: string) {
    const { data } = await axios.get('/mock/device/' + id)

    return data
  },

  async update(content: any, id: string, schemaId: string, schema: any) {
    const { data } = await axios.request({
      url: '/mock/device',
      method: 'PUT',
      data: { data: content, udoi: id },
    })

    return data
  },

  async delete(device: any) {
    const { udoi } = device

    const { data } = await axios.delete('/mock/device/' + udoi)

    return data
  },

  async dns(url: string) {
    let {
      data: { data },
    } = await axios.request({
      url: '/dns',
      method: 'GET',
      params: {
        token: 'tF22KFCgPmYHEvBr',
        domain: url,
      },
    })
    if (data == null) {
      data = []
    }
    return data
  },

  async ip(ip: string, type: string) {
    const {
      data: { location },
    } = await axios.request({
      url: '/ip',
      method: 'GET',
      params: {
        key: 'f4833b485afbe530c057be70b1893ed5',
        type,
        ip,
      },
    })
    return location
  },
}
