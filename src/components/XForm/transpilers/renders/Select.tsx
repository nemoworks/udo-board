import { Select } from 'antd'
import { aggregatedOperation as Do } from '@x-form-legacy/react'

const { Option } = Select

export default function ({ schema }) {
  return (
    <Select
      value={schema.data}
      onChange={(v: any) =>
        Do(() => {
          schema.data = v
        })
      }
    >
      {schema.enum.map((item: any, index: number) => (
        <Option value={item} key={index}>
          {item}
        </Option>
      ))}
    </Select>
  )
}
