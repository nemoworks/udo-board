// import { Map, Marker, NavigationControl, InfoWindow, ScaleControl, MapTypeControl, Label } from 'react-bmapgl'
import { useState, useEffect } from 'react'
import { history } from 'umi'
import { DeviceRQ } from '@/requests'
import mqtt from 'mqtt'
// import { BaiduMap, Marker, Label, MarkerClusterer, Polyline, Icon } from 'react-baidu-maps';
import { Map, Markers, Polyline, Circle, InfoWindow } from 'react-amap'
import { Button, Cascader } from 'antd'
import { Decrypt } from '@/utils'
import './index.less'

export default function ({ devices: ds }) {
  const [devices, setDevices] = useState<any[]>([])
  const [human, setHuman] = useState<any[]>([])
  const [resources, setResources] = useState<any>({})

  const [connectionStatus, setConnectionStatus] = useState(false)
  const [messages, setMessages] = useState([])
  const [polylines, setPolylines] = useState([])

  const [center, setCenter] = useState({ longitude: 116.402544, latitude: 39.928216 })
  const [zoom, setZoom] = useState(4)

  useEffect(() => {
    if (ds.length != 0) {
      const others = ds
        .filter(d => Object.keys(d.data).find(d => d == 'location'))
        .map(d => {
          let location = '0,0'
          if (Object.keys(d).find(e => e == 'data')) {
            if (Object.keys(d.data).find(e => e == 'location')) {
              if (Object.keys(d.data.location).find(e => e == 'longitude')) {
                location = d.data.location.longitude + ',' + d.data.location.latitude
              }
            }
          }
          return {
            ...d,
            location,
          }
        })
      // const people = ds
      //   .filter(d => d.schema.schema.title == 'human')
      //   .map(d => {
      //     let location = '0,0'
      //     if (Object.keys(d).find(e => e == 'data')) {
      //       if (Object.keys(d.data).find(e => e == 'location')) {
      //         if (Object.keys(d.data.location).find(e => e == 'longitude')) {
      //           location = d.data.location.longitude + ',' + d.data.location.latitude
      //         }
      //       }
      //     }
      //     return {
      //       ...d,
      //       location,
      //     }
      //   })
      const total: any[] = [...others].map(d => {
        const { location } = d
        const position = location.split(',').map(s => parseFloat(s))
        return {
          ...d,
          display: 'none',
          position: {
            longitude: position[0],
            latitude: position[1],
          },
          title: d.udoi,
          lable: { content: 'd.udoi' },
        }
      })
      // console.log(total)
      setDevices(total)

      // let polyline = people.map(p => {
      //   let location: string = p.location
      //   const position = location.split(',').map(s => parseFloat(s))
      //   return { udoi: p.udoi, location: [{ longitude: position[0], latitude: position[1] }] }
      // })
      // setPolylines(polyline)

      // const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

      // const host = 'ws://broker.emqx.io:8083/mqtt'
      // // const host = 'ws://210.28.134.32:1884/mqtt'

      // const options = {
      //   keepalive: 60,
      //   clientId: clientId,
      //   protocolId: 'MQTT',
      //   protocolVersion: 4,
      //   clean: true,
      //   reconnectPeriod: 1000,
      //   connectTimeout: 30 * 1000,
      //   // username: 'udo-user',
      //   // password: '123456',
      // }

      // console.log('Connecting mqtt client')
      // const client = mqtt.connect(host, options)

      // client.on('error', (err) => {
      //   console.log('Connection error: ', err)
      //   client.end()
      // })

      // client.on('reconnect', () => {
      //   console.log('Reconnecting...')
      // })
      // client.on('connect', () => {
      //   console.log('Client connected:' + clientId)
      //   // Subscribe
      //   // client.subscribe('topic/test', { qos: 0 })
      //   client.subscribe('zzz', { qos: 0 })
      // })
      // client.on('message', (topic, message, packet) => {
      //   let payload: any = JSON.parse(message.toString())
      //   if (Object.keys(payload).find(e => e == 'longitude') && Object.keys(payload).find(e => e == 'latitude')) {
      //     setDevices(total.map(d => d.udoi == payload.sender ? {
      //       ...d, location: payload.longitude + ',' + payload.latitude, position: {
      //         longitude: payload.longitude,
      //         latitude: payload.latitude,
      //       }
      //     } : d))
      //     const newPolyline = polyline.map(p => {
      //       if (p.udoi == payload.sender) {
      //         let location: any[] = p.location
      //         location = [...location, { lng: payload.longitude, lat: payload.latitude }]
      //         return { ...p, location }
      //       }
      //       return p
      //     })
      //     polyline = newPolyline
      //     setPolylines(newPolyline)
      //   }

      // })
    }
  }, [ds])

  return (
    <div style={{ width: '100%', height: '98.4%', marginTop: '9px' }}>
      <Map
        amapkey={'c4682e400c06b2b8be5e65b99c6404f5'}
        zoom={zoom}
        center={center}
        events={{
          click: e => {
            // console.log(e.target.getZoom())
            console.log(e.target.getCenter())
          },
        }}
      >
        {devices.length == 0 ? null : (
          <Markers
            markers={devices}
            useCluster={true}
            events={{
              click: (e, marker) => {
                const extData = marker.getExtData()
                history.push('/device/' + extData.udoi)
              },
              // mouseover: (e, marker) => {
              //   const { lng: longitude, lat: latitude } = marker.getPosition()
              //   const extData = marker.getExtData()
              //   const info: any = infoWindow
              //   setInfoWindow({ ...info, visible: true, position: { longitude, latitude }, content: extData.udoi })
              // },
              // mouseout: (e, marker) => {
              //   const extData = marker.getExtData()
              //   const info: any = infoWindow
              //   setInfoWindow({ ...info, visible: false })
              // },
            }}
            render={extData => {
              return (
                <div
                  style={{
                    background: `url('` + Decrypt(extData.data.avatarUrl) + `')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '30px',
                    height: '40px',
                  }}
                ></div>
              )
            }}
          />
        )}

        {/* {polylines.length == 0
          ? null
          : polylines.map(p => {
            const polyline: any = p
            return <Polyline path={polyline.location} />
          })} */}
        {/* {devices.length == 0
          ? null
          : devices.map(d => {
              const device: any = d
              if (device.schema.schema.title == 'human')
                return <Circle center={device.position} radius={10} bubble={false} />
            })} */}
        {devices.length == 0
          ? null
          : devices.map(d => {
              const device: any = d
              if (device.schema.schema.title == 'Room') {
                // console.log(device)
                let r = 0
                if (Object.keys(device.data).find(k => k == 'radius') && device.data.radius != undefined) {
                  // console.log(device.data.radius)
                  r = device.data.radius

                  return <Circle style={{ fillOpacity: '0.3' }} center={device.position} radius={r} bubble={false} />
                }
              }
            })}
        {/* <InfoWindow
          position={infoWindow.position}
          visible={infoWindow.visible}
          isCustom={false}
          content={infoWindow.content}
          events={{
            close: () => {
              const info: any = infoWindow
              setInfoWindow({ ...info, visible: false })
            }
          }
          }
        /> */}
        <div className="customLayer" style={{ position: 'absolute', right: '10px', bottom: '15px' }}>
          {/* <Button onClick={() => { alert('You Clicked!') }}>An Ant Design Button</Button> */}
          <Cascader
            popupPlacement="topRight"
            options={options}
            onChange={(value, selectedOptions) => {
              // console.log(selectedOptions)
              if (selectedOptions != undefined && selectedOptions.length != 0) {
                const lastIndex = selectedOptions.length - 1
                setCenter(selectedOptions[lastIndex].position)
                setZoom(selectedOptions[lastIndex].zoom)
              }
            }}
            changeOnSelect
          />
        </div>
      </Map>
    </div>
  )
}

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    position: { longitude: 120.071463, latitude: 29.364877 },
    zoom: 7,
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        position: { longitude: 120.231161, latitude: 30.224716 },
        zoom: 11,
      },
      {
        value: 'jiaxing',
        label: '嘉兴',
        position: { longitude: 120.747347, latitude: 30.757822 },
        zoom: 11,
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    position: { longitude: 119.012827, latitude: 32.858301 },
    zoom: 7,
    children: [
      {
        value: 'nanjing',
        label: '南京',
        position: { longitude: 118.816672, latitude: 32.085536 },
        zoom: 11,
        children: [
          {
            value: 'NJU',
            label: '南京大学',
            position: { longitude: 118.96, latitude: 32.119 },
            zoom: 15,
          },
        ],
      },
    ],
  },
]
