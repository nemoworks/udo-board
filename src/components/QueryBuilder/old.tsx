import { Component, useState } from 'react'
import { Query, Builder, Utils } from 'react-awesome-query-builder'
import AntdConfig from 'react-awesome-query-builder/lib/config/antd'

import 'react-awesome-query-builder/lib/css/styles.css'
import 'react-awesome-query-builder/lib/css/compact_styles.css'

// You need to provide your own config. See below 'Config format'
const config: any = {
  ...AntdConfig,
  fields: {
    udoType: {
      label: 'UDO类型',
      type: 'text',
      valueSources: ['value'],
      preferWidgets: ['text'],
    },
    timeRange: {
      label: '时间段',
      type: 'date',
      valueSources: ['value'],
      preferWidgets: ['date'],
    },
  },
  renderBuilder: (props: any) => <Builder {...props} />,
}

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue: any = { id: Utils.uuid(), type: 'group' }

export default function () {
  const [value, setValue] = useState(Utils.checkTree(Utils.loadTree(queryValue), config))

  function changeHandler(tree: any, config: any) {
    console.log(Utils.getTree(tree))
    setValue(tree)
  }

  return <Query {...config} value={value} onChange={changeHandler} />
}

// export default class DemoQueryBuilder extends Component {
//   state = {
//     tree: Utils.checkTree(Utils.loadTree(queryValue as any), config as any),
//     config: config,
//   }

//   render = () => (
//     <div>
//       <Query {...(config as any)} value={this.state.tree} onChange={this.onChange} renderBuilder={this.renderBuilder} />
//       {this.renderResult(this.state)}
//     </div>
//   )

//   renderBuilder = (props: any) => (
//     <div className="query-builder-container" style={{ padding: '10px' }}>
//       <div className="query-builder qb-lite">
//         <Builder {...props} />
//       </div>
//     </div>
//   )

//   renderResult = ({ tree: immutableTree, config }: any) => (
//     <div className="query-builder-result">
//       <div>
//         Query string: <pre>{JSON.stringify(Utils.queryString(immutableTree, config))}</pre>
//       </div>
//       <div>
//         MongoDb query: <pre>{JSON.stringify(Utils.mongodbFormat(immutableTree, config))}</pre>
//       </div>
//       <div>
//         SQL where: <pre>{JSON.stringify(Utils.sqlFormat(immutableTree, config))}</pre>
//       </div>
//       <div>
//         JsonLogic: <pre>{JSON.stringify(Utils.jsonLogicFormat(immutableTree, config))}</pre>
//       </div>
//     </div>
//   )

//   onChange = (immutableTree: any, config: any) => {
//     // Tip: for better performance you can apply `throttle` - see `examples/demo`
//     this.setState({ tree: immutableTree, config: config })

//     const jsonTree = Utils.getTree(immutableTree)
//     console.log(jsonTree)
//     // `jsonTree` can be saved to backend, and later loaded to `queryValue`
//   }
// }
