import { useState, useEffect } from 'react'
import { Card, Tag } from 'antd'

export default function DeviceCard({ deviceId: d, extra }) {
  const [device, setDevice] = useState({
    id: d,
    name: '设备A',
    tags: ['标签1', '标签2'],
  })

  useEffect(() => {
    // 添加 DeviceRQ
  }, [])

  const { name, tags } = device

  return (
    <Card title={name} size="small" hoverable={true} extra={extra}>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </Card>
  )
}
