import { useState, useEffect } from 'react'
import mqtt from 'mqtt'

export default () => {
  const [log, setLog] = useState('')

  useEffect(() => {
    const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

    const host = 'ws://broker.emqx.io:8083/mqtt'
    // const host = 'ws://210.28.134.32:1884/mqtt'
    const subTopic = 'topic/log'

    const options = {
      keepalive: 60,
      clientId: clientId,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 10000,
      connectTimeout: 30 * 1000,
      // username: 'udo-user',
      // password: '123456',
    }

    console.log('Connecting mqtt client')
    const client = mqtt.connect(host, options)

    client.on('error', err => {
      console.log('Connection error: ', err)
      client.end()
    })

    client.on('reconnect', () => {
      console.log('Reconnecting...')
    })
    client.on('connect', () => {
      console.log('Client connected:' + clientId)
      client.subscribe(subTopic, { qos: 0 })
    })
    let init = ''
    client.on('message', (topic, message, packet) => {
      const m = message.toString()
      init = init + m + '\n'
      setLog(init)
      // console.log(init)
    })
  }, [])

  return {
    log,
    setLog,
  }
}
