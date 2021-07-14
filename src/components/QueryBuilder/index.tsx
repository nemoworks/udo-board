import QueryBuilder from 'react-querybuilder'
import { useEffect } from 'react'
import { Button } from 'antd'

export default function ({ device, onQueryChange, udoId, contextId, setSelectedUdoId, updateApplicationContext }) {
  if (device.query == undefined) {
    device = { ...device, query: null }
  }

  const timeRangeOperators: { name: string; label: string }[] = [
    { name: 'equalValues', label: 'equalValues' },
    { name: 'timeLargerValues', label: 'timeLargerValues' },
    { name: 'timeLessValues', label: 'timeLessValues' },
    { name: 'largerThanValues', label: 'largerThanValues' },
    { name: 'lessThanValues', label: 'lessThanValues' },
  ]

  const fields = [{ name: 'clock', label: '时间段', operators: timeRangeOperators }]

  return (
    <>
      <QueryBuilder
        query={device.query}
        fields={fields}
        onQueryChange={query => {
          onQueryChange({ ...device, query })
        }}
      />
      <Button type="primary" onClick={_ => updateApplicationContext(udoId)}>
        更新规则
      </Button>
    </>
  )
}
