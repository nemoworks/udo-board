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
  },
  {
    udoi: 'D000002',
    data: {
      name: '小明',
      state: 'true',
      location: '118.961365,32.110012',
    },
    type: {
      id: 'S000002',
      schema: {
        type: 'object',
        title: '人',
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
            title: '地理编码',
          },
        },
      },
    },
  },
  {
    udoi: 'D000003',
    data: {
      name: '小红',
      state: 'true',
      location: '116.402544,39.928216',
    },
    type: {
      id: 'S000002',
      schema: {
        type: 'object',
        title: '人',
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
            title: '地理编码',
          },
        },
      },
    },
  },
  {
    udoi: 'D000004',
    data: {
      name: '天气查询',
      url: 'https://restapi.amap.com/v3/weather/weatherInfo',
      document: 'https://lbs.amap.com/api/webservice/guide/api/weatherinfo',
    },
    type: {
      id: 'S000003',
      schema: {
        type: 'object',
        title: 'api',
        properties: {
          name: {
            type: 'string',
            title: '资源名称',
          },
          url: {
            type: 'string',
            title: '接口地址',
          },
          document: {
            type: 'string',
            title: '接口文档',
          },
        },
      },
    },
  },
  {
    udoi: 'D000005',
    data: {
      name: '生活指数',
      url: 'https://v2.alapi.cn/api/weather/life?location=南京&token=3XtHPDUJX7x38zUj',
      document: 'https://www.alapi.cn/api/view/69',
    },
    type: {
      id: 'S000003',
      schema: {
        type: 'object',
        title: 'api',
        properties: {
          name: {
            type: 'string',
            title: '资源名称',
          },
          url: {
            type: 'string',
            title: '接口地址',
          },
          document: {
            type: 'string',
            title: '接口文档',
          },
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

function initializeDevice(source: any) {
  const udoi = 'D' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

  return {
    type: source,
    udoi,
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

  'PUT /mock/device': ({ body }, res) => {
    devices = devices.map(d => (d.udoi === body.udoi ? { ...d, ...body } : d))
    res.send(body)
  },

  'DELETE /mock/device/:id': ({ params: { id }, res }) => {
    devices = devices.filter(d => d.udoi !== id)
    res.send({
      status: 'success',
    })
  },
} as APIMap
