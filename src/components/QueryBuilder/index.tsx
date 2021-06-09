import { Select } from 'antd'

const { Option } = Select

interface Props {
  constraints: {
    type: string
    value: string | number
  }[]

  onChange: Function
}

const constraintTypeMap = {
  string: ['==', '!='],
}

const constraintTypes = Object.keys(constraintTypeMap)

export default function ({ constraints = [], onChange }: Props) {
  return (
    <div className="queryBuilder">
      <div className="list">
        {constraints.map(constraint => (
          <div className="item">
            <Select>{}</Select>
          </div>
        ))}
      </div>
    </div>
  )
}
