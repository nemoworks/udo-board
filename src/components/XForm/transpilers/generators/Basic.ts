import { __render__ } from '@x-form/react-jsonschema'
import renders from '../renders'

const { Select, Input, DatePicker, Link } = renders

export default function (schema) {
  const renders = schema[__render__]

  switch (schema.type) {
    case 'string':
      renders.push(schema.enum ? Select : Input)
      break
    case 'date':
      renders.push(DatePicker)
      break
    case 'link':
      renders.push(Link)
      break
  }
}
