import { Input } from 'antd'
import { Do } from '@x-form/react-jsonschema'

export default function ({ schema }) {
  return (
    <Input
      value={schema.data || ''}
      onChange={(e: any) =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}
