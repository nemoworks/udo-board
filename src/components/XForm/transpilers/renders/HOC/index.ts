import { cloneElement } from 'react'
import { __fragment__ } from '@x-form-legacy/react'

const __depth__ = Symbol('data item depth')
const __label__ = Symbol('use label')

export { __depth__, __label__ }

export default function HOC(render) {
  return render[__fragment__]
    ? render
    : ({ schema, index, children }) =>
        cloneElement(render({ schema, index, children }), {
          'hoc-index': index,
          'hoc-depth': schema[__depth__],
        })
}
