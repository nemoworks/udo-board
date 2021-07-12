import { Checkbox } from 'antd'
import { Do } from '@x-form/react-jsonschema'

export default function ({ schema }) {
  return (
    <Checkbox
      checked={schema.data || false}
      onChange={e =>
        Do(() => {
          schema.data = e.target.checked
        })
      }
    />
  )
}
