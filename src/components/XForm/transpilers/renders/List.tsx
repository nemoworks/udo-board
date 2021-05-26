import { List } from 'antd'

const { Item } = List

export default function ({ schema, children }) {
  return Array.isArray(children) ? (
    <List>
      {children.map((child, index) => (
        <Item key={index}>
          <span className="serial">{index + 1}</span>
          {child}
        </Item>
      ))}
    </List>
  ) : (
    children
  )
}
