import { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { history } from 'umi'
import { Icon } from '@/components'
import './index.less'
import { useModel } from 'umi'
import mqtt from 'mqtt'

const { Sider, Header, Content } = Layout
const { Item } = Menu

const pathMap = {
  '': '主页',
  user: '客户',
  property: '资产',
  device: '资源',
  schema: '类型',
  application_context: '应用实例',
  log: '日志',
}

export default function ({ children, location }) {
  const [collapse, setCollapse] = useState(true)

  const [layoutDisplay, setLayoutDisplay] = useState(true)

  const { setLog } = useModel('log', ret => ({
    setLog: ret.setLog,
  }))

  const { layoutVisible } = useModel('layoutVisible', ret => ({
    layoutVisible: ret.layoutVisible,
  }))

  const path = Object.keys(pathMap).find(key => key !== '' && location.pathname.startsWith('/' + key))
  // const { initialState, setInitialState } = useModel('@@initialState')
  const items = Object.keys(pathMap).map(path => {
    return (
      <Item
        key={path}
        icon={<Icon type={'icon-' + (path === '' ? 'home' : path)} />}
        onClick={() => history.push('/' + path)}
      >
        {pathMap[path]}
      </Item>
    )
  })

  useEffect(() => {
    setLayoutDisplay(layoutVisible)
  }, [layoutVisible])

  // useEffect(() => {
  //   let init = ''
  //   // if (initialState != undefined) {
  //   //   init = initialState
  //   // }
  //   const clientId = 'mqttclient'

  //   const host = 'ws://broker.emqx.io:8083/mqtt'
  //   // const host = 'ws://210.28.134.32:1884/mqtt'
  //   const subTopic = 'topic/log'

  //   const options = {
  //     keepalive: 60,
  //     clientId: clientId,
  //     protocolId: 'MQTT',
  //     protocolVersion: 4,
  //     clean: true,
  //     reconnectPeriod: 1000,
  //     connectTimeout: 30 * 1000,
  //     // username: 'udo-user',
  //     // password: '123456',
  //   }

  //   console.log('Connecting mqtt client')
  //   const client = mqtt.connect(host, options)

  //   client.on('error', err => {
  //     // console.log('Connection error: ', err)
  //     client.end()
  //   })

  //   client.on('reconnect', () => {
  //     console.log('Reconnecting...')
  //   })
  //   client.on('connect', () => {
  //     console.log('Client connected:' + clientId)
  //     // Subscribe
  //     // client.subscribe('topic/test', { qos: 0 })
  //     client.subscribe(subTopic, { qos: 0 })
  //   })
  //   client.on('message', (topic, message, packet) => {
  //     const m = message.toString()
  //     init = init + m + '\n'
  //     setLog(init)
  //     console.log('init', init)
  //     // setInitialState(init)
  //   })

  //   // return () => {
  //   //   client.unsubscribe(subTopic, () => {
  //   //     console.log('Unsubscribed')
  //   //   })
  //   //   client.end(true, () => {
  //   //     console.log('mqtt end')
  //   //   })
  //   // }
  // }, [])

  // console.log('init', initialState)

  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapse} style={{ display: layoutDisplay ? 'block' : 'none' }}>
        <Menu mode="inline">
          <Item
            className="logo"
            icon={<Icon type="icon-cloud" />}
            key="这个地方不加 Key 就会报错"
            onClick={() => setCollapse(!collapse)}
            title={null}
          >
            UDO-Board
          </Item>
          {items}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ display: layoutDisplay ? 'block' : 'none' }}>
          <Icon type={'icon-' + (path ?? 'home')} />
          <span className="text">{pathMap[path ?? '']}</span>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
