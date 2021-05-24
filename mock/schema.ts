const schemas = [
  {
    id: '000001',
    content: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    },
  },
]

interface API {
  (req: any, res: any): any
}

interface APIMap {
  [key: string]: API
}

export default {
  'GET /mock/schema': (req, res) => {
    res.send(schemas)
  },

  'GET /mock/schema/:id': ({ params: { id } }, res) => {
    res.send(schemas.find(s => s.id === id))
  },
} as APIMap
