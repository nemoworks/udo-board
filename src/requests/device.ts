import axios from 'axios'
import dayjs from 'dayjs'
import { getRequest, getReponse, Encrypt, Decrypt, AddTitle } from '@/utils'

export default {
  async getAll(schemas: any[]) {
    let data: any[] = []
    for (let schema of schemas) {
      // if (Object.keys(schema.schema).find(k => k == 'title') == undefined) {
      //   continue
      // }
      const {
        schema: { title, properties },
        id,
      } = schema
      // let list: string[] = []
      // for (let p in properties) {
      //   if (typeof (properties[p]) != 'object') {
      //     list.push(p)
      //   }
      // }
      if (Object.keys(properties).find(e => e == 'data')) {
        delete properties['data']
      }
      const response = getReponse(properties)
      const query = `
      {
        ${title}Documents(
          udoTypeId: "${id}"
        ){
          udoi
          ${response}
        }
      }`
      // console.log(query)
      const { data: res } = await axios.post('/api/documents/query', query, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      const r = res[title + 'Documents']
      for (let i of r) {
        data.push({ ...i, schema, data: i })
      }
    }
    // for (let d of data) {
    //   console.log(d.data.avatarUrl)
    //   console.log(Decrypt(d.data.avatarUrl))
    // }

    console.log(data)
    return data
  },

  async createFromSchema(schema: any) {
    const {
      schema: { title, properties },
      id,
    } = schema

    const query = `
      {
        new${title}(
          content: {
          }
          udoTypeId: "${id}"
        ){
          udoi
        }
      }
    `

    const { data: res } = await axios.post('/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })

    const data = res['new' + title]
    return data
  },

  async createFromUrlAndSchema(schema: any, createType: string, url: string) {
    console.log(schema, createType, url)
    const {
      schema: { title, properties },
      id,
    } = schema

    const query = `
      {
        new${title}(
          content: {
          }
          udoTypeId: "${id}"
          uri : "${url}"
          uriType:"${createType}"
        ){
          udoi
        }
      }
    `

    const { data: res } = await axios.post('/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })

    const data = res['new' + title]
    return data
  },

  async inferAndCreateFromUrl(
    uri: string,
    name: string,
    location: string,
    avatarUrl: string,
    uriType: string = 'HTTP'
  ) {
    console.log(uri, name, location, avatarUrl, uriType)
    const encode = Encrypt(avatarUrl)
    console.log('encode', encode)
    const position = location.split(',').map(s => parseFloat(s))
    const { data } = await axios.request({
      method: 'POST',
      url: '/api/documents',
      params: {
        uri,
        name,
        longitude: position[0],
        latitude: position[1],
        avatarUrl: encode,
        uriType,
      },
    })
    console.log(data)
    return data
  },

  async getById(id: string) {
    let { data } = await axios.get('/api/documents/' + id)
    let {
      type: {
        schema: { properties },
      },
    } = data
    properties = AddTitle({ ...properties })
    data.type.schema.properties = properties
    console.log(data)
    return data
  },

  async get(id: string, schema: any) {
    const { title, properties } = schema

    const response = Object.keys(properties).join('\n')

    const query = `
    {
      ${title}(udoi:"${id}"){
        ${response}
      }
    }
  `

    const { data: res } = await axios.post('/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })

    const data = res[title]
    return data
  },

  async update(content: any, id: string, schemaId: string, schema: any) {
    console.log(schema)
    const { title, properties } = schema
    // let location: string = content.location
    if (Object.keys(content).find(e => e == 'avatarUrl')) {
      const { avatarUrl } = content
      content = { ...content, avatarUrl: Encrypt(avatarUrl) }
    }
    console.log('content', content)
    const response = Object.keys(properties).join('\n')
    // delete content['location']
    let request = JSON.stringify(content).replaceAll(',', '\n')
    request = getRequest(request, properties)
    // request = request.replace('}', '')
    // request = request + '\n' + 'location:"' + location + '"\n}'

    const query = `
      {
        update${title}(
          udoi:"${id}"
          content:
          ${request}
          udoTypeId: "${schemaId}"
          uri : "http://localhost:8081/"
        ){
          udoi
        }
      }
    `
    console.log(query)
    const { data: res } = await axios.post('/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })

    const data = res[title]
    // console.log(data)
    return data
  },

  async delete(device: any) {
    const {
      udoi,
      schema: {
        schema: { title },
      },
    } = device
    const query = `
      {
        delete${title}(udoi:"${udoi}"){
          deleteResult
        }
      }
    `

    const { data } = await axios.post('/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })

    return data
  },

  async grapgQL(query: string) {
    const { data } = await axios.post('/api/documents/query', query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
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

// export default {
//   async getAll(schemas: any[]) {
//     let data: any[] = []
//     for (let schema of schemas) {
//       const { id } = schema

//       const { data: res } = await axios.request({
//         method: 'GET',
//         url: '/mock/device',
//         params: {
//           schemaId: id,
//         },
//       })

//       for (let i of res) {
//         data.push({ ...i, schema })
//       }
//     }
//     return data
//   },

//   async create(schema: any) {
//     const { id } = schema

//     const { data } = await axios.request({
//       method: 'POST',
//       url: '/mock/device',
//       data: { ...schema },
//     })
//     return data
//   },

//   async createFromUrl(uri: string, name: string, location: string, uriType: string, avatarUrl: string) {

//     const { data } = await axios.request({
//       url: '/device',
//       method: 'POST',
//       data: { uri, name, location, avatarUrl },
//     })
//     return data
//   },

//   async getById(id: string) {
//     const { data } = await axios.get('/mock/device/' + id)

//     return data
//   },

//   async update(content: any, id: string, schemaId: string, schema: any) {
//     const { data } = await axios.request({
//       url: '/mock/device',
//       method: 'PUT',
//       data: { data: content, udoi: id },
//     })

//     return data
//   },

//   // async updateLocation(content: any, id: string) {
//   //   const { data } = await axios.request({
//   //     url: '/device',
//   //     method: 'PUT',
//   //     data: { location: content, udoi: id },
//   //   })

//   //   return data
//   // },

//   async delete(device: any) {
//     const { udoi } = device

//     const { data } = await axios.delete('/mock/device/' + udoi)

//     return data
//   },

//   async dns(url: string) {
//     let {
//       data: { data },
//     } = await axios.request({
//       url: '/dns',
//       method: 'GET',
//       params: {
//         token: 'tF22KFCgPmYHEvBr',
//         domain: url,
//       },
//     })
//     if (data == null) {
//       data = []
//     }
//     return data
//   },

//   async ip(ip: string, type: string) {
//     const {
//       data: { location },
//     } = await axios.request({
//       url: '/ip',
//       method: 'GET',
//       params: {
//         key: 'f4833b485afbe530c057be70b1893ed5',
//         type,
//         ip,
//       },
//     })
//     return location
//   },
// }
