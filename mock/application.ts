import dayjs from 'dayjs'

let applications: any[] = [
  {
    id: 'A000001',
    name: '409',
    createOn: dayjs().format(),
    tags: ['I2EC'],
    devices: ['D000001'],
  },
]

interface API {
  (req: any, res: any): any
}

interface APIMap {
  [key: string]: API
}

export default {
  'GET /mock/application': (req, res) => {
    res.send(applications)
  },

  'GET /mock/application/:id': ({ params: { id } }, res) => {
    res.send(applications.find(s => s.id === id))
  },

  'POST /mock/application': ({ body }, res) => {
    const application = {
      ...body,
      id: 'U' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0'),
    }
    applications.push(application)
    res.send(application)
  },

  'PUT /mock/application': ({ body }, res) => {
    applications = applications.map(s => (s.id === body.id ? body : s))
    res.send(body)
  },

  'DELETE /mock/application/:id': ({ params: { id }, res }) => {
    applications = applications.filter(s => s.id !== id)
    res.send({
      status: 'success',
    })
  },
} as APIMap
