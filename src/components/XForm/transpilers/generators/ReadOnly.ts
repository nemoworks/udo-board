import { __render__ } from '@x-form-legacy/react-jsonschema'
import renders from '../renders'

const { Info } = renders

export default function ReadOnly(schema) {
  const renders = schema[__render__]

  switch (schema.type) {
    case 'string':
      renders.push(Info)
      break
    case 'date':
      renders.push(Info)
      break
  }
}
