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
    { name: 'timeRange', label: '时间段', inputType: 'date', operators: timeRangeOperators },
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

// import XForm from '@x-form/react-jsonschema'
// import { TranspilerFactory, __render__ } from '@x-form/react-jsonschema'
// import { Select, Input, DatePicker, Options, List } from '@/renders'

// const transpile = TranspilerFactory({
//     injectors: [],
//     generators: [
//         (schema: any) => {
//             const renders = schema[__render__]

//             switch (schema.type) {
//                 case 'string':
//                     renders.push(schema.enum ? Select : Input)
//                     break
//                 case 'date':
//                     renders.push(DatePicker)
//                     break
//                 case 'array':
//                     renders.push(Options, List)
//                     break
//             }
//         },
//     ],
// })

// interface Props {
//     constraints: {
//         type: string
//         value: string | number
//     }[]

//     onChange: Function
// }

// export default function ({ constraints = [], onChange }: Props) {
//     return (
//         <XForm
//             schema={{
//                 type: 'array',
//                 template: {
//                     type: 'object',
//                     properties: {
//                         rule: {
//                             type: 'string',
//                             enum: ['前缀', '后缀'],
//                         },
//                         operator: {
//                             type: 'string',
//                             enum: ['选项一', '选项二'],
//                         },
//                         value: {
//                             type: 'string',
//                             enum: ['选项一', '选项二'],
//                         },
//                     },
//                 },

//                 initializeText: '初始化过滤规则',
//             }}
//             extensions={{
//                 transpile,
//             }}
//         />
//     )
// }
