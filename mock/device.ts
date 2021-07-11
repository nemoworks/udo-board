import dayjs from 'dayjs'

let devices: any[] = [
  {
    udoi: 'D000001',
    data: {
      name: '小米11',
    },
    type: {
      id: 'S000001',
      schema: {
        type: 'object',
        title: '设备A',
        properties: {
          name: {
            type: 'string',
            title: '设备名称',
          },
        },
      },
    },
    contextInfo: {},
  },
  {
    udoi: 'D000002',
    data: {
      name: '小明',
      state: 'true',
      location: '116.402544,39.928216',
      avatarUrl: 'https://img.icons8.com/ios-filled/50/000000/naruto.png',
    },
    type: {
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
          avatarUrl: {
            type: 'string',
          },
        },
      },
    },
    contextInfo: {},
  },
  {
    udoi: 'D000003',
    data: {
      name: '小红',
      state: 'true',
      location: '117.402544,39.928216',
      avatarUrl: 'https://img.icons8.com/glyph-neue/64/000000/super-mario.png',
    },
    type: {
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
          avatarUrl: {
            type: 'string',
          },
        },
      },
    },
    contextInfo: {},
  },
  {
    udoi: 'AF64D641-D9CF-46CA-8A72-5225EFEBC411',
    data: {
      name: 'test user',
      state: 'true',
      location: '130.963191,32.110777',
      avatarUrl: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
    },
    type: {
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
          avatarUrl: {
            type: 'string',
          },
        },
      },
    },
    contextInfo: {},
  },

  {
    type: {
      schema: {
        $schema: 'http://json-schema.org/draft-06/schema#',
        additionalProperties: false,
        type: 'object',
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
          avatarUrl: {
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
    data: {
      country: '中国',
      province: '黑龙江省',
      city: '牡丹江市',
      district: '阳明区',
      isp: '中国联通',
      ip: '221.206.131.10',
      infocode: '10000',
      location: '129.634645,44.596328',
      status: '1',
      info: 'OK',
      avatarUrl: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
    },
    udoi: '92HudXoByHFkYFqEhXOM',
    createdOn: 0,
    createdBy: 'nemoworks',
    modifiedOn: 0,
    uri: 'https://restapi.amap.com/v5/ip?key=f4833b485afbe530c057be70b1893ed5&type=4&ip=221.206.131.10',
    contextInfo: { contexts: {} },
  },
]

interface API {
  (req: any, res: any): any
}

interface APIMap {
  [key: string]: API
}

function initializeDevice(source: any) {
  const udoi = 'D' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

  return {
    type: source,
    udoi,
    data: {},
  }
}

export default {
  'GET /mock/device': (req, res) => {
    res.send(devices.filter(d => d.type.id == req.query.schemaId))
  },

  'GET /mock/device/:id': ({ params: { id } }, res) => {
    res.send(devices.find(d => d.udoi === id))
  },

  'POST /mock/device': ({ body }, res) => {
    const device = initializeDevice(body)
    devices.push(device)
    res.send(device)
  },

  'POST /device': ({ body }, res) => {
    const schema = {
      id: 'S000001',
      schema: {
        type: 'object',
        title: '设备A',
        properties: {
          name: {
            type: 'string',
            title: '设备名称',
          },
        },
      },
    }
    let device = initializeDevice(schema)
    devices.push(device)
    const content = { uri: body.uri, data: { name: body.name, location: body.loaction }, avater: body.avater }
    devices = devices.map(d => (d.udoi === device.udoi ? { ...d, ...content } : d))
    const id: string = device.udoi
    const result = { ...device, id }
    res.send(result)
  },

  'PUT /mock/device': ({ body }, res) => {
    devices = devices.map(d => (d.udoi === body.udoi ? { ...d, ...body } : d))
    res.send(body)
  },

  'PUT /device': ({ body }, res) => {
    devices = devices.map(d => (d.udoi === body.udoi ? { ...d, contextInfo: { location: body.location } } : d))
    res.send(body)
  },

  'DELETE /mock/device/:id': ({ params: { id }, res }) => {
    devices = devices.filter(d => d.udoi !== id)
    res.send({
      status: 'success',
    })
  },
} as APIMap
