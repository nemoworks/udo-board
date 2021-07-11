import { DeviceRQ } from '@/requests'
import { history } from 'umi'
import { BaiduMap, Marker, Label, MarkerClusterer, Polyline } from 'react-baidu-maps'

type ColumnDifinition = [string, string, Function, number] | [string, string, Function] | [string, string]

function generateColumns(source: ColumnDifinition[]): any {
  return source.map(([title, dataIndex, render, width]) => ({
    title: title,
    dataIndex: dataIndex,
    render: render,
    width: width,
  }))
}

function getIp(dns: any[], setLocation: any) {
  let ips: any[] = dns
  if (ips.length != 0) {
    if (Object.keys(ips[0]).find(e => e == 'target')) {
      const { target } = ips[0]
      DeviceRQ.dns(target).then(d => {
        getIp(d, setLocation)
      })
    } else {
      const ip = ips[0]
      const keys = Object.keys(ip)
      if (keys.find(e => e == 'ip')) {
        const { ip: i } = ip
        DeviceRQ.ip(i, '4').then(d => {
          setLocation(d)
        })
      } else if (keys.find(e => e == 'ipv6')) {
        const { ipv6: i } = ip
        DeviceRQ.ip(i, '6').then(d => {
          setLocation(d)
        })
      }
    }
  }
}

function getLocation(url: string, setLocation: any) {
  DeviceRQ.dns(url).then(d => {
    if (d.length != 0) {
      getIp(d, setLocation)
    }
  })
}

function getRequest(content: string, properties: any): string {
  let request = content
  for (let key in properties) {
    request = request.replace('"' + key + '"', key)
    console.log(key, properties[key])
    if (properties[key].type == 'object') {
      request = getRequest(request, properties[key].properties)
    }
  }

  return request
}

export { generateColumns, getLocation, getRequest }
