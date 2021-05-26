import { __label__ } from '../renders'

export default function Label(schema, params) {
  schema[__label__] = params[__label__] ?? true
  let useLabel = schema[__label__]
  schema.type === 'array' && schema.display !== undefined && (useLabel = false)

  return {
    ...params,
    [__label__]: useLabel,
  }
}
