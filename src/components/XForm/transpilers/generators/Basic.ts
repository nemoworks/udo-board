import { __render__ } from '@x-form-legacy/react-jsonschema'
import renders from '../renders'

const { Select, Input, DatePicker, Link, Checkbox } = renders

export default function (schema) {
  const renders = schema[__render__]

  switch (schema.type) {
    case 'string':
    case 'number':
    case 'bool':
    case 'Link':
      renders.push(schema.enum ? Select : Input)
      break
    // case 'bool':
    //   renders.push(Checkbox)
    //   break
    case 'date':
      renders.push(DatePicker)
      break
    // case 'link':
    //   renders.push(Link)
    //   break
  }
}
