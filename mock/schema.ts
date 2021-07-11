import dayjs from 'dayjs'

let schemas: any[] = [
  {
    id: 'S000001',
    schema: {
      type: 'object',
      title: '资源',
      properties: {
        name: {
          type: 'string',
          title: '资源名称',
        },
      },
    },
  },
  {
    id: 'S000002',
    schema: {
      type: 'object',
      title: 'human',
      properties: {
        name: {
          type: 'string',
          title: '人名',
        },
        state: {
          type: 'string',
          title: '状态',
        },
        location: {
          type: 'string',
          title: '位置',
        },
      },
    },
  },

  {
    schema: {
      $schema: 'http://json-schema.org/draft-06/schema#',
      additionalProperties: false,
      type: 'object',
      title: 'ip',
      properties: {
        country: {
          type: 'string',
        },
        province: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        district: {
          type: 'string',
        },
        isp: {
          type: 'string',
        },
        ip: {
          type: 'string',
        },
        infocode: {
          type: 'string',
        },
        location: {
          type: 'string',
        },
        status: {
          type: 'string',
        },
        info: {
          type: 'string',
        },
      },
      required: ['country', 'province', 'city', 'district', 'isp', 'ip', 'infocode', 'location', 'status', 'info'],
    },
    id: '-GHudXoByHFkYFqEinMq',
    createdOn: 0,
    createdBy: 'nemoworks',
    modifiedOn: 0,
    contextInfo: {},
  },
]

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
  'GET /schemas': (req, res) => {
    res.send(schemas)
  },

  'GET /schemas/:id': ({ params: { id } }, res) => {
    res.send(schemas.find(s => s.id === id))
  },

  'POST /schemas': ({ body }, res) => {
    const schema = initializeSchema(body)
    schemas.push(schema)
    res.send(schema)
  },

  'PUT /schemas/:id': ({ body, params: { id } }, res) => {
    schemas = schemas.map(s => (s.id === id ? { id, schema: body } : s))
    res.send(body)
  },

  'DELETE /schemas/:id': ({ params: { id }, res }) => {
    schemas = schemas.filter(s => s.id !== id)
    res.send({
      status: 'success!!',
    })
  },
} as APIMap
