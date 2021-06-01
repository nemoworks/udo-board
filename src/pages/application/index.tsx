import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, message } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page } from '@/components'
import { ApplicationRQ } from '@/requests'
import { generateColumns } from '@/utils'

export default function () {
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    ApplicationRQ.getAll().then(setApplications)
  }, [])

  const columns = generateColumns([
    ['创建时间', 'createOn', (text: string) => <a>{dayjs(text).format('YYYY/MM/DD hh:mm:ss')}</a>],
    ['场景名称', 'name'],
    ['标签', 'tags', (tags: string[]) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
    [
      '',
      '',
      (text: string, record: any, index: number) => (
        <>
          <Icon type="icon-edit" onClick={_ => history.push('/application/' + record.id)} />
          <Icon
            type="icon-delete"
            onClick={_ =>
              ApplicationRQ.delete(record.id).then(_ => {
                setApplications(applications.filter(u => u.id !== record.id))
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
    <Page className="application" title="UDO-Board | 场景管理">
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
                ApplicationRQ.create().then(u => {
                  message.success('创建成功', 0.5)
                  history.push('/application/' + u.id)
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
          dataSource={applications}
        />
      </Card>
    </Page>
  )
}
