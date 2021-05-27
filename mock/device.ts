import dayjs from 'dayjs'

let devices: any[] = [
  {
    id: 'D000001',
    name: 'Perish 的手机',
    user: 'U000001',
    createOn: dayjs().format(),
    tags: ['手机'],
    schema: 'S000001',
    content: {
      name: '小米11',
    },
  },
]

interface API {
  (req: any, res: any): any
}

interface APIMap {
  [key: string]: API
}

function initializeDevice(source: any) {
  const id = 'D' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

  return {
    ...source,
    id,
  }
}

export default {
  'GET /mock/device': (req, res) => {
    res.send(devices)
  },

  'GET /mock/device/:id': ({ params: { id } }, res) => {
    res.send(devices.find(s => s.id === id))
  },

  'POST /mock/device': ({ body }, res) => {
    const device = initializeDevice(body)
    devices.push(device)
    res.send(device)
  },

  'PUT /mock/device': ({ body }, res) => {
    devices = devices.map(s => (s.id === body.id ? body : s))
    res.send(body)
  },

  'DELETE /mock/device/:id': ({ params: { id }, res }) => {
    devices = devices.filter(s => s.id !== id)
    res.send({
      status: 'success',
    })
  },
} as APIMap
