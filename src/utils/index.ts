import property from '@/pages/property'
import { DeviceRQ } from '@/requests'

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
  // console.log(url)
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
    // console.log(key, properties[key])
    if (properties[key].type == 'object') {
      request = getRequest(request, properties[key].properties)
    }
  }

  return request
}

function getReponse(properties: any): string {
  let response = ''
  for (let key in properties) {
    if (properties[key].type != 'object' && properties[key].type != 'Link') {
      response = response + key + '\n'
    } else if (properties[key].type == 'object') {
      response = response + key + '{\n' + getReponse(properties[key].properties) + '}'
    }
  }
  return response
}

//解密方法
function Decrypt(word) {
  const CryptoJS = require('crypto-js') //引用AES源码js

  const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') //十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') //十六位十六进制数作为密钥偏移量
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

//加密方法
function Encrypt(word) {
  const CryptoJS = require('crypto-js') //引用AES源码js

  const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') //十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') //十六位十六进制数作为密钥偏移量
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}

function AddTitle(properties: any) {
  let d: any = { ...properties }
  for (let key in d) {
    if (d[key].type != undefined && d[key].type == 'object') {
      d[key].properties = AddTitle({ ...d[key].properties })
      d[key] = { title: key, ...d[key] }
    } else if (
      d[key].type != undefined &&
      (d[key].type == 'string' || d[key].type == 'number' || d[key].type == 'bool' || d[key].type == 'Link')
    ) {
      d[key] = { title: key, ...d[key] }
    }
  }

  return d
}

export { generateColumns, getLocation, getRequest, getReponse, Decrypt, Encrypt, AddTitle }
