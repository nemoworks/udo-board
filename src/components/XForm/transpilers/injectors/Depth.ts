import { __depth__ } from '../renders'

export default function Depth(schema, params) {
  const depth = params[__depth__] ?? 0
  schema[__depth__] = depth

  return {
    ...params,
    [__depth__]: depth + 1,
  }
}
