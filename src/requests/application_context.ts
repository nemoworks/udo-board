import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async getAll() {
    const { data } = await axios.get('/api/applicationContext')
    const result = data.map(d => ({ id: d }))
    console.log(result)
    return result
  },

  async get(id: string) {
    //console.log(id)
    const { data } = await axios.get('/api/applicationContext/' + id)
    console.log(data)
    return data
  },

  async create(name = '未命名场景', devices = [], tags = []) {
    const id = 'C' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
    const { data } = await axios.request({
      url: '/api/applicationContext',
      method: 'POST',
      params: {
        id,
      },
    })
    console.log(data)
    return data
  },

  async update(id: string, filter: any) {
    let r: string = JSON.stringify(filter)
    const { data } = await axios.request({
      url: '/api/applicationContext/filter',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      params: {
        id,
      },
      data: r,
    })
    console.log(data)
    const result = JSON.parse(data)
    console.log(result)
    return result
  },

  async delete(id: string) {
    const { data } = await axios.request({
      url: '/api/applicationContext',
      method: 'delete',
      params: {
        id,
      },
    })
    console.log(data)
    return data
  },
}

// export default {
//   async getAll() {
//     const { data } = await axios.get('/mock/application_context')
//     return data
//   },

//   async get(id: string) {
//     const { data } = await axios.get('/mock/application_context/' + id)
//     return data
//   },

//   async create(name = '未命名场景', devices = [], tags = []) {
//     const { data } = await axios.post('/mock/application_context', {
//       devices,
//       tags,
//       name,
//       createOn: dayjs().format(),
//     })

//     return data
//   },

//   async update(application_context: any) {
//     const { data } = await axios.put('/mock/application_context', application_context)
//     return data
//   },

//   async delete(id: string) {
//     const { data } = await axios.delete('/mock/application_context/' + id)
//     return data
//   },
// }
