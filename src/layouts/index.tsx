import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { history } from 'umi'
import { Icon } from '@/components'
import './index.less'

const { Sider, Header, Content } = Layout
const { Item } = Menu

function getHeader(pathname: string) {
  const headers = [
    ['user', '客户'],
    ['property', '资产'],
    ['device', '设备'],
    ['schema', '模板'],
  ]

  for (const [path, title] of headers)
    if (pathname.startsWith('/' + path))
      return (
        <>
          <Icon type={'icon-' + path} />
          <span className="text">{title}</span>
        </>
      )

  return (
    <>
      <Icon type="icon-home" />
      <span className="text">主页</span>
    </>
  )
}

export default function ({ children, location }) {
  const [collapse, setCollapse] = useState(true)
  const header = getHeader(location.pathname)

  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapse}>
        <Menu mode="inline">
          <Item className="logo" icon={<Icon type="icon-cloud" />} onClick={() => setCollapse(!collapse)} title={null}>
            UDO-Board
          </Item>
          <Item icon={<Icon type="icon-home" />} onClick={() => history.push('/')}>
            主页
          </Item>
          <Item icon={<Icon type="icon-user" />} onClick={() => history.push('/user')}>
            客户
          </Item>
          <Item icon={<Icon type="icon-property" onClick={() => history.push('/property')} />}>资产</Item>
          <Item icon={<Icon type="icon-device" onClick={() => history.push('/device')} />}>设备</Item>
          <Item icon={<Icon type="icon-schema" onClick={() => history.push('/schema')} />}>模板</Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>{header}</Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
