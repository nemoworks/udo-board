import { Map, Marker, NavigationControl, InfoWindow, ScaleControl, MapTypeControl, Label } from 'react-bmapgl'
import { useState, useEffect } from 'react'
import { history } from 'umi'
import { DeviceRQ } from '@/requests'
import './index.less'

function getIp(dns: any[], device: any, setResources: any) {
  let ips: any[] = dns
  if (ips.length != 0) {
    if (Object.keys(ips[0]).find(e => e == 'target')) {
      const { target } = ips[0]
      DeviceRQ.dns(target).then(d => {
        getIp(d, device, setResources)
      })
    } else {
      for (const ip of ips) {
        const keys = Object.keys(ip)
        if (keys.find(e => e == 'ip')) {
          const { ip: i } = ip
          DeviceRQ.ip(i, '4').then(d => {
            const { data: dat } = device
            const data = { ...dat, location: d }
            const temp: any = { ...device, data, display: 'none' }
            setResources(temp)
          })
        } else if (keys.find(e => e == 'ipv6')) {
          const { ipv6: i } = ip
          DeviceRQ.ip(i, '6').then(d => {
            const { data: dat } = device
            const data = { ...dat, location: d }
            const temp: any = { ...device, data, display: 'none' }
            setResources(temp)
          })
        }
      }
    }
  }
}

function initialDevices(devices: any, setResources: any) {
  for (const device of devices) {
    const {
      data: { url },
    } = device
    DeviceRQ.dns(url).then(d => {
      if (d.length != 0) {
        getIp(d, device, setResources)
      }
    })
  }
}

function generateMarkers(devices: any[], setDevices: any) {
  return devices.map(d => {
    const location: string = d.data.location
    const position = location.split(',').map(s => parseFloat(s))
    return (
      <>
        <Label
          position={{ lng: position[0], lat: position[1] }}
          text={d.type.schema.title + '/' + d.udoi}
          style={{ display: d.display }}
          offset={new BMapGL.Size(10, -25)}
        />
        <Marker
          icon={'simple_red'}
          position={{ lng: position[0], lat: position[1] }}
          onMouseover={e => {
            const ds = devices.map(d2 => {
              return d2.udoi == d.udoi && d2.data.location == d.data.location ? { ...d, display: 'block' } : d2
            })
            setDevices(ds)
          }}
          onMouseout={e => {
            const ds = devices.map(d2 => {
              return d2.udoi == d.udoi && d2.data.location == d.data.location ? { ...d, display: 'none' } : d2
            })
            setDevices(ds)
          }}
          onClick={_ => history.push('/device/' + d.udoi)}
          //enableDragging
        />
      </>
    )
  })
}

export default function ({ devices: ds }) {
  const [devices, setDevices] = useState<any[]>([])
  const [resources, setResources] = useState<any>({})
  useEffect(() => {
    const ds2 = ds.filter(d => Object.keys(d.data).find(d => d == 'location'))
    setDevices(
      ds2.map(d => {
        return {
          ...d,
          display: 'none',
        }
      })
    )
    const ds3: any[] = ds.filter(d => Object.keys(d.data).find(d => d == 'url'))
    if (ds3.length != 0) {
      initialDevices(ds3, setResources)
    }
  }, [ds])

  useEffect(() => {
    const keys = Object.keys(resources)
    if (keys.length != 0) {
      const d: any[] = [...devices]
      d.push(resources)
      setDevices(d)
    }
  }, [resources])

  return (
    <Map
      style={{ height: '100%' }}
      center={{ lng: 116.402544, lat: 39.928216 }}
      zoom="5"
      onClick={e => console.log(e)}
      enableScrollWheelZoom
    >
      <MapTypeControl map />
      <NavigationControl map />
      <ScaleControl map />
      {devices.length == 0 ? [] : generateMarkers(devices, setDevices)}
    </Map>
  )
}
