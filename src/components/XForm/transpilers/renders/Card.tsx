import { Card } from 'antd'

export default function ({ schema: { title }, children }) {
  return (
    <Card title={title} size="small">
      {children}
    </Card>
  )
}
