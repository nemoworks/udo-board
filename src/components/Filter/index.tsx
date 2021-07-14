import { useState, useEffect } from 'react'
import { Input } from '@material-ui/core'
import { Card, Tooltip, message, Modal, Button, Drawer, Dropdown, Menu, Table } from 'antd'
import { Icon, QueryBuilder } from '@/components'
import { generateColumns } from '@/utils'
import dayjs from 'dayjs'

export default function ({
  names,
  setNames,
  contextId,
  deleteApplication,
  applicationContext,
  setFilter,
  setSelectedUdoId,
  updateApplicationContext,
}) {
  // console.log(applicationContext)

  const [open, setOpen] = useState(false)
  const [udoId, setUdoId] = useState('')
  const ns = names.map(n => {
    return {
      id: n,
      contextId: contextId,
    }
  })
  // console.log('ns', ns)
  // return (
  //     names.map((n, index) => {
  //         // console.log(n, index)
  //         return (
  //             <>
  //                 <Input value={names[index]} onChange={e => { names[index] = e.target.value; setNames(names) }} />
  //                 <Tooltip overlay="保存">
  //                     <Icon type="icon-delete" onClick={_ => { let ns: string[] = [...names]; ns.splice(index, 1); console.log('nsss', ns); setNames(ns) }} />
  //                 </Tooltip>
  //             </>
  //         )
  //     })
  // )

  return (
    <>
      <>
        <Table
          rowSelection={{
            type: 'checkbox',
          }}
          rowKey="id"
          dataSource={ns}
          columns={generateColumns([
            ['创建时间', 'createOn', () => <span>{dayjs().format('YYYY/MM/DD hh:mm:ss')}</span>],
            ['资源名称', 'id', (text: string, record: any, index: number) => <span>{record.id}</span>],
            ['场景ID', 'contextId', (text: string, record: any, index: number) => <span>{record.contextId}</span>],
            [
              '',
              '',
              (text: string, record: any, index: number) => (
                <>
                  <Icon
                    type="icon-edit"
                    onClick={_ => {
                      setOpen(true)
                      setUdoId(record.id)
                    }}
                  />
                  <Icon
                    type="icon-delete"
                    onClick={_ => {
                      return deleteApplication(record.id, record.contextId)
                    }}
                  />
                </>
              ),
              100,
            ],
          ])}
        />
      </>
      <>
        <Drawer
          placement="right"
          visible={open}
          title="消息过滤规则配置"
          onClose={_ => setOpen(false)}
          closeIcon={null}
          width="50%"
        >
          <QueryBuilder
            device={applicationContext}
            onQueryChange={setFilter}
            udoId={udoId}
            contextId={contextId}
            setSelectedUdoId={setSelectedUdoId}
            updateApplicationContext={updateApplicationContext}
          />
        </Drawer>
      </>
    </>
  )
}
