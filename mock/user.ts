import dayjs from 'dayjs'

let users: any[] = [
  {
    id: 'U000001',
    name: 'Perish',
    createOn: dayjs().format(),
    tags: ['I2EC'],
    email: 'perishcode@gmail.com',
  },
  {
    id: 'U000002',
    name: 'Perish',
    createOn: dayjs().format(),
    tags: ['I2EC'],
    email: 'perishcode@gmail.com',
  },
]

interface API {
  (req: any, res: any): any
}

interface APIMap {
  [key: string]: API
}

function initializeUser(source: any) {
  const id = 'U' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

  return {
    ...source,
    id,
  }
}

export default {
  'GET /mock/user': (req, res) => {
    res.send(users)
  },

  'GET /mock/user/:id': ({ params: { id } }, res) => {
    res.send(users.find(s => s.id === id))
  },

  'POST /mock/user': ({ body }, res) => {
    const user = initializeUser(body)
    users.push(user)
    res.send(user)
  },

  'PUT /mock/user': ({ body }, res) => {
    users = users.map(s => (s.id === body.id ? body : s))
    res.send(body)
  },

  'DELETE /mock/user/:id': ({ params: { id }, res }) => {
    users = users.filter(s => s.id !== id)
    res.send({
      status: 'success',
    })
  },
} as APIMap
