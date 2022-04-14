import { aggregatedOperation as Do } from '@x-form-legacy/react'

export default function Input({ schema }) {
  return (
    <input
      type="date"
      value={schema.data || ''}
      onChange={(e: any) =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}
