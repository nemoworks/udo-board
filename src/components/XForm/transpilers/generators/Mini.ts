import { __render__ } from '@x-form-legacy/react-jsonschema'
import renders, { __label__, __depth__ } from '../renders'

const { Options, List, Card, Divider, Label } = renders

export default function (schema) {
  const renders = schema[__render__]
  const useLabel = schema[__label__]
  const depth = schema[__depth__]

  switch (schema.type) {
    case 'array':
      //   renders.push(Options)
      //   schema.display === 'list' && renders.push(List)
      //   useLabel && renders.push(depth === 0 ? Card : Divider)
      break
    case 'object':
      //   useLabel && renders.push(depth === 0 ? Card : Divider)
      break
    default:
      useLabel && renders.push(Label)
  }
}
