import { useState, useEffect } from 'react'
import { Card, List, Avatar } from 'antd'
import './index.less'

const data = [
  {
    title: '应用 1',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '1.0.0',
  },
  {
    title: '应用 2',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '1.0.0',
  },
  {
    title: '应用 3',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '1.0.0',
  },
  {
    title: '应用 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '1.0.0',
  },
]

export default function () {
  return (
    <Card className="application-list" title="应用列表">
      <List
        size="small"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Card>
  )
}
