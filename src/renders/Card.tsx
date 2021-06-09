import { Card } from 'antd'

export default function ({ schema: { title }, children }) {
  return <Card title={title}>{children}</Card>
}
