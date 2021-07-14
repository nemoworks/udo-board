import { Page } from '@/components'
import CodeMirror from '@uiw/react-codemirror'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css'
import { useState, useEffect } from 'react'
import mqtt from 'mqtt'

export default function () {
  const [code, setCode] = useState('')
  const [Mess, setMess] = useState('')

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
      reconnectPeriod: 1000,
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
      // Subscribe
      // client.subscribe('topic/test', { qos: 0 })
      client.subscribe(subTopic, { qos: 0 })
    })
    client.on('message', (topic, message, packet) => {
      const m = message.toString()

      // console.log(m)
      setMess(m + '\n')
    })

    return () => {
      client.unsubscribe(subTopic, () => {
        console.log('Unsubscribed')
      })
      client.end(true, () => {
        console.log('mqtt end')
      })
    }
  }, [])

  useEffect(() => {
    setCode(code + Mess)
  }, [Mess])
  return (
    <Page className="log" title="UDO-Board | 日志">
      <CodeMirror
        value={code}
        options={{
          theme: 'monokai',
          keyMap: 'sublime',
          mode: 'jsx',
        }}
      />
    </Page>
  )
}
