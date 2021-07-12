import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, message } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page } from '@/components'
import { ApplicationContextRQ } from '@/requests'
import { generateColumns } from '@/utils'

export default function () {
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [applicationContexts, setApplicationContexts] = useState<any[]>([])

  useEffect(() => {
    ApplicationContextRQ.getAll().then(setApplicationContexts)
  }, [])
  //console.log('applicationContexts', applicationContexts)
  const columns = generateColumns([
    ['创建时间', 'createOn', (text: string) => <a>{dayjs(text).format('YYYY/MM/DD hh:mm:ss')}</a>],
    ['场景名称', 'name', (text: string, record: any, index: number) => <span>{record.id}</span>],
    ['标签', 'tags', (tags: string[] = []) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
    [
      '',
      '',
      (text: string, record: any, index: number) => (
        <>
          <Icon type="icon-edit" onClick={_ => history.push('/application_context/' + record.id)} />
          <Icon
            type="icon-delete"
            onClick={_ =>
              ApplicationContextRQ.delete(record.id).then(_ => {
                setApplicationContexts(applicationContexts.filter(u => u.id !== record.id))
                message.success('删除成功', 0.5)
              })
            }
          />
        </>
      ),
      100,
    ],
  ])

  return (
    <Page className="application_context" title="UDO-Board | 场景管理">
      <Card
        title={
          <>
            <span className="text">场景</span>
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
          </>
        }
        extra={
          <>
            <Icon
              type="icon-create"
              onClick={_ =>
                ApplicationContextRQ.create().then(u => {
                  message.success('创建成功', 0.5)
                  history.push('/application_context/' + u)
                })
              }
            />
          </>
        }
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: setSelectedRowKeys as any,
          }}
          rowKey="id"
          columns={columns}
          dataSource={applicationContexts}
        />
      </Card>
    </Page>
  )
}
