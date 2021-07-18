import { useState, useEffect } from 'react'
import { List, Card, Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.less'

const data = [
  {
    title: 'Title 1',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 1,
  },
  {
    title: 'Title 2',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 12,
  },
  {
    title: 'Title 3',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 6,
  },
  {
    title: 'Title 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 9,
  },
  {
    title: 'Title 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 99,
  },
  {
    title: 'Title 3',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 12,
  },
  {
    title: 'Title 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 199,
  },
  {
    title: 'Title 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 0,
  },
  {
    title: 'Title 1',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 1,
  },
  {
    title: 'Title 2',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 12,
  },
  {
    title: 'Title 3',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 6,
  },
  {
    title: 'Title 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 9,
  },
  {
    title: 'Title 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 99,
  },
  {
    title: 'Title 3',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 12,
  },
  {
    title: 'Title 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    count: 199,
  },
]

export default function () {
  return (
    <Card title="物理资源">
      <List
        grid={{ gutter: 0, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item className="devicerecource">
            <Badge count={item.count}>
              <Avatar
                src={item.avatar}
                icon={<UserOutlined />}
                size={{ xs: 12, sm: 16, md: 26, lg: 32, xl: 40, xxl: 64 }}
              />
            </Badge>
          </List.Item>
        )}
      />
    </Card>
  )
}
