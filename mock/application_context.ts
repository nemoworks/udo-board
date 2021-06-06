import dayjs from 'dayjs'

let application_contexts: any[] = [
  {
    id: 'A000001',
    name: '409',
    createOn: dayjs().format(),
    tags: ['I2EC'],
    devices: [
      {
        id: 'D000001',
        constraints: [
          {
            type: 'startWithPrefix',
            value: 'A',
          },
        ],
      },
    ],
  },
]

interface API {
  (req: any, res: any): any
}

interface APIMap {
  [key: string]: API
}

export default {
  'GET /mock/application_context': (req, res) => {
    res.send(application_contexts)
  },

  'GET /mock/application_context/:id': ({ params: { id } }, res) => {
    res.send(application_contexts.find(s => s.id === id))
  },

  'POST /mock/application_context': ({ body }, res) => {
    const application_context = {
      ...body,
      id: 'U' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0'),
    }
    application_contexts.push(application_context)
    res.send(application_context)
  },

  'PUT /mock/application_context': ({ body }, res) => {
    application_contexts = application_contexts.map(s => (s.id === body.id ? body : s))
    res.send(body)
  },

  'DELETE /mock/application_context/:id': ({ params: { id }, res }) => {
    application_contexts = application_contexts.filter(s => s.id !== id)
    res.send({
      status: 'success',
    })
  },
} as APIMap
