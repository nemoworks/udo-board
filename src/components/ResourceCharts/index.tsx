import { useState, useEffect } from 'react'
import { Card } from 'antd'
import ResourceUsage from '../ResourceUsage'

const tabList = [
  {
    key: 'usage',
    tab: '资源使用情况',
  },
  {
    key: 'schedule',
    tab: '资源调度',
  },
  {
    key: 'service',
    tab: '服务质量',
  },
  {
    key: 'info',
    tab: '实时信息',
  },
]

const contentList = {
  usage: {
    render: () => <ResourceUsage />,
  },
  schedule: {
    render: () => <p>schedule content</p>,
  },
  service: {
    render: () => <p>service content</p>,
  },
  info: {
    render: () => <p>info content</p>,
  },
}

export default function () {
  const [tabKey, setTabKey] = useState('usage')

  return (
    <Card
      tabList={tabList}
      activeTabKey={tabKey}
      onTabChange={key => {
        setTabKey(key)
      }}
    >
      {contentList[tabKey].render()}
    </Card>
  )
}
