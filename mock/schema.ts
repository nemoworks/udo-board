let schemas: any[] = []

interface API {
  (req: any, res: any): any
}

interface APIMap {
  [key: string]: API
}

function initializeSchema(source: any) {
  const id = 'S' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

  return {
    ...source,
    id,
  }
}

export default {
  'GET /mock/schema': (req, res) => {
    res.send(schemas)
  },

  'GET /mock/schema/:id': ({ params: { id } }, res) => {
    res.send(schemas.find(s => s.id === id))
  },

  'POST /mock/schema': ({ body }, res) => {
    const schema = initializeSchema(body)
    schemas.push(schema)
    res.send(schema)
  },

  'PUT /mock/schema': ({ body }, res) => {
    schemas = schemas.map(s => (s.id === body.id ? body : s))
    res.send(body)
  },

  'DELETE /mock/schema/:id': ({ params: { id }, res }) => {
    schemas = schemas.filter(s => s.id !== id)
    res.send({
      status: 'success',
    })
  },
} as APIMap
