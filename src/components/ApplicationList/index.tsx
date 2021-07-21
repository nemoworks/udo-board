import { useState, useEffect } from 'react'
import { Card, List, Avatar } from 'antd'
import './index.less'

const data = [
  {
    title: '会议安排',
    avatar: require('/src/assets/applications/huiyi.png'),
    description: '0.2.1',
    diagram: require('/src/assets/diagrams/huiyi.png'),
  },
  {
    title: '智慧城管',
    avatar: require('/src/assets/applications/chengshi.png'),
    description: '1.2.11',
    diagram: require('/src/assets/diagrams/chengshi.png'),
  },
  {
    title: '家装设计',
    avatar: require('/src/assets/applications/jiazhuangsheji.png'),
    description: '3.0.8',
  },
  {
    title: '来一杯咖啡',
    avatar: require('/src/assets/applications/kafei.png'),
    description: '8.6.0',
  },
  {
    title: '看漫画',
    avatar: require('/src/assets/applications/manhua.png'),
    description: '5.0.3',
  },
  {
    title: '智能画室',
    avatar: require('/src/assets/applications/shuhuashi.png'),
    description: '3.0.8',
  },
]

export default function ({ displayDiagram }) {
  return (
    <Card className="application-list-card" title="应用列表">
      <List
        className="application-list-list"
        dataSource={data}
        renderItem={item => (
          <List.Item
            onClick={_ => {
              displayDiagram(item)
            }}
          >
            <List.Item.Meta
              avatar={<Avatar size="small" shape="square" src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
