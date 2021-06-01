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
  device: '设备',
  schema: '模板',
  application: '场景',
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
          <Item className="logo" icon={<Icon type="icon-cloud" />} onClick={() => setCollapse(!collapse)} title={null}>
            UDO-Board
          </Item>
          {items}
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
