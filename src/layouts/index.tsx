import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { history } from 'umi'
import { Icon } from '@/components'
import './index.less'

const { Sider, Header, Content } = Layout
const { Item } = Menu

const pathMap = {
  '': '主页',
  user: '客户',
  property: '资产',
  device: '资源',
  schema: '类型',
  application_context: '场景',
  cloud: '日志',
}

export default function ({ children, location }) {
  const [collapse, setCollapse] = useState(true)

  const path = Object.keys(pathMap).find(key => key !== '' && location.pathname.startsWith('/' + key))

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

  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapse}>
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
          {/* {
            <Item
              key={'/log'}
              onClick={() => history.push('/' + 'log')}
              icon={<Icon type="icon-cloud" />}
            >
            </Item>
          } */}
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <Icon type={'icon-' + (path ?? 'home')} />
          <span className="text">{pathMap[path ?? '']}</span>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
