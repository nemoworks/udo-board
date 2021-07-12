// import { Map, Marker, NavigationControl, InfoWindow, ScaleControl, MapTypeControl, Label } from 'react-bmapgl'
import { useState, useEffect } from 'react'
import { history } from 'umi'
import { DeviceRQ } from '@/requests'
import mqtt from 'mqtt'
// import { BaiduMap, Marker, Label, MarkerClusterer, Polyline, Icon } from 'react-baidu-maps';
import { Map, Markers, Polyline, Circle, InfoWindow } from 'react-amap'
import './index.less'

export default function ({ devices: ds }) {
  const [devices, setDevices] = useState<any[]>([])
  const [human, setHuman] = useState<any[]>([])
  const [resources, setResources] = useState<any>({})

  const [connectionStatus, setConnectionStatus] = useState(false)
  const [messages, setMessages] = useState([])
  const [polylines, setPolylines] = useState([])

  useEffect(() => {
    if (ds.length != 0) {
      const others = ds
        .filter(d => Object.keys(d.data).find(d => d == 'location'))
        .map(d => {
          let location = ','
          location = d.data.location.longitude + ',' + d.data.location.latitude
          return {
            ...d,
            location,
          }
        })
      const people = ds
        .filter(d => d.schema.schema.title == 'human')
        .map(d => {
          let location = ','
          if (Object.keys(d).find(e => e == 'data')) {
            if (Object.keys(d.data).find(e => e == 'location')) {
              location = d.data.location.longitude + ',' + d.data.location.latitude
            }
          }
          return {
            ...d,
            location,
          }
        })
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
      setDevices(total)

      let polyline = people.map(p => {
        let location: string = p.location
        const position = location.split(',').map(s => parseFloat(s))
        return { udoi: p.udoi, location: [{ longitude: position[0], latitude: position[1] }] }
      })
      setPolylines(polyline)

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
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        amapkey={'c4682e400c06b2b8be5e65b99c6404f5'}
        zoom={4}
        center={{ longitude: 116.402544, latitude: 39.928216 }}
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
                    background:
                      `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/` +
                      extData.data.avatarUrl +
                      `')`,
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

        {polylines.length == 0
          ? null
          : polylines.map(p => {
              const polyline: any = p
              return <Polyline path={polyline.location} />
            })}
        {devices.length == 0
          ? null
          : devices.map(d => {
              const device: any = d
              if (device.schema.schema.title == 'human')
                return <Circle center={device.position} radius={10} bubble={false} />
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
      </Map>
    </div>
  )
}
