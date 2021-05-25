import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, Dropdown, Menu, Tooltip, message } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page } from '@/components'
import { generateColumns } from '@/utils'
import { SchemaRQ } from '@/requests'
import './index.less'

const { Item } = Menu

export default function () {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [schemas, setSchemas] = useState<any[]>([])

  useEffect(() => {
    SchemaRQ.getAll().then(setSchemas)
  }, [])

  function createFromEmpty() {
    SchemaRQ.create({}).then(({ id }) => {
      message.success('创建成功', 0.5)
      history.push('/schema/' + id)
    })
  }

  function createFromUrl() {}

  function createFromTemplate({ content, name, tags, template }) {
    SchemaRQ.create(content, name + '-未命名副本', tags, template).then(({ id }) => {
      message.success('创建成功', 0.5)
      history.push('/schema/' + id)
    })
  }

  function deleteById(id) {
    SchemaRQ.delete(id).then(_ => {
      message.success('删除成功', 0.5)
      setSchemas(schemas.filter(s => s.id !== id))
    })
  }

  const overlay = (
    <Menu>
      <Item onClick={createFromEmpty}>空白模板</Item>
      {schemas
        .filter(s => s.template)
        .map(s => (
          <Item key={s.id} onClick={_ => createFromTemplate(s)}>
            {s.name}
          </Item>
        ))}
    </Menu>
  )

  const columns = generateColumns([
    ['创建时间', 'createOn', (text: string) => <a>{dayjs(text).format('YYYY/MM/DD hh:mm:ss')}</a>],
    ['模板名称', 'name'],
    ['标签', 'tags', (tags: string[]) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
    ['模板', 'template', (template: boolean) => (template ? '√' : '×')],
    [
      '',
      '',
      (text: string, record: any, index: number) => (
        <>
          <Icon type="icon-edit" onClick={_ => history.push('/schema/' + record.id)} />
          <Icon type="icon-delete" onClick={_ => deleteById(record.id)} />
        </>
      ),
      100,
    ],
  ])

  return (
    <Page className="schema" title="UDO-Board | 模板管理">
      <Card
        title={
          <>
            <span className="text">模板</span>
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
          </>
        }
        extra={
          <>
            <Input value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} />
            <Tooltip overlay="从 URL 导入">
              <Icon type="icon-import" />
            </Tooltip>
            <Dropdown overlay={overlay} trigger={['click']}>
              <Icon type="icon-template" />
            </Dropdown>
          </>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={schemas}
          rowSelection={{
            type: 'checkbox',
            onChange: setSelectedRowKeys as any,
          }}
        />
      </Card>
    </Page>
  )
}
