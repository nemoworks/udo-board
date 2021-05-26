import { Divider } from 'antd'

export default function ({ schema: { title }, children }) {
  return (
    <div>
      <Divider orientation="center">{title}</Divider>
      <div>{children}</div>
    </div>
  )
}
