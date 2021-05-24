import { useState } from 'react'
import { Card, Table, Tag } from 'antd'
import { Input } from '@material-ui/core'
import { Icon } from '@/components'

export default function () {
  const [searchText, setSearchText] = useState('')

  return (
    <div className="page schema container">
      <Card
        title={
          <>
            <span className="text">模板</span>
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
          </>
        }
        extra={
          <>
            <Icon type="icon-store" />
          </>
        }
      ></Card>
    </div>
  )
}
