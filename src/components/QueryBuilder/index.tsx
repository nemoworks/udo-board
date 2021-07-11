import QueryBuilder from 'react-querybuilder'
import { useEffect } from 'react'

export default function ({ device, onQueryChange }) {
  if (device.query == undefined) {
    device = { ...device, query: null }
  }

  const timeRangeOperators: { name: string; label: string }[] = [
    { name: '=', label: '=' },
    { name: '!=', label: '!=' },
    { name: '<', label: '<' },
    { name: '>', label: '>' },
    { name: '<=', label: '<=' },
    { name: '>=', label: '>=' },
  ]

  const fields = [
    { name: 'UDOType', label: 'UDO类型' },
    { name: 'timeRange', label: '时间段', operators: timeRangeOperators },
  ]

  return (
    <>
      <QueryBuilder
        query={device.query}
        fields={fields}
        onQueryChange={query => {
          onQueryChange({ ...device, query })
        }}
      />
    </>
  )
}
