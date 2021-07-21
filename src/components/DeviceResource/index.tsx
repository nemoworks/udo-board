import { useState, useEffect } from 'react'
import { List, Card, Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.less'

const data = [
  {
    title: '咖啡机',
    avatar: require('/src/assets/devices/Coffee_Maker.png'),
    count: 1,
  },
  {
    title: '打印机',
    avatar: require('/src/assets/devices/DevicesNetwork_pr.png'),
    count: 12,
  },
  {
    title: '风扇',
    avatar: require('/src/assets/devices/fan.png'),
    count: 6,
  },
  {
    title: '台灯',
    avatar: require('/src/assets/devices/light.png'),
    count: 9,
  },
  {
    title: '监控器',
    avatar: require('/src/assets/devices/monitor.png'),
    count: 199,
  },
]

export default function () {
  return (
    <Card className="device-recource-card" title="物理资源">
      <List
        grid={{ gutter: 0, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item className="device-recource-list-item">
            <Badge count={item.count} size="small">
              <Avatar
                src={item.avatar}
                icon={<UserOutlined />}
                size={{ xs: 10, sm: 14, md: 20, lg: 26, xl: 36, xxl: 50 }}
                shape="square"
              />
            </Badge>
          </List.Item>
        )}
      />
    </Card>
  )
}
