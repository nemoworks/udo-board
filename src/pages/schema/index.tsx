import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, Dropdown, Menu, Tooltip, message, Modal } from 'antd'
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

  const [schemaName, setSchemaName] = useState('')

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    SchemaRQ.getAll().then(schema => {
      setSchemas(schema)
    })
  }, [])
  function createFromEmpty() {
    SchemaRQ.create({}).then(({ id }) => {
      message.success('创建成功', 0.5)
      history.push('/schema/' + id)
    })
  }

  function createFromUrl() {
    // SchemaRQ.createFromUrl(sourceUrl, schemaName).then(({ type: { id } }) => {
    //   message.success('导入成功', 0.5)
    //   history.push('/schema/' + id)
    // })
  }

  function createFromTemplate({ schema }) {
    SchemaRQ.create(schema).then(({ id }) => {
      message.success('创建成功', 0.5)
      history.push('/schema/' + id)
    })
  }

  function deleteById(schema: any) {
    SchemaRQ.delete(schema).then(_ => {
      message.success('删除成功', 0.5)
      setSchemas(schemas.filter(s => s.id !== schema.id))
    })
  }

  const overlay = (
    <Menu>
      <Item onClick={createFromEmpty}>空白类型</Item>
      {schemas
        .filter(s => !Object.keys(s.schema).find(k => k == '$schema'))
        .map(s => (
          <Item key={s.id} onClick={_ => createFromTemplate(s)}>
            {s.id}模版
          </Item>
        ))}
    </Menu>
  )

  const columns = generateColumns([
    ['创建时间', 'createOn', () => <a>{dayjs().format('YYYY/MM/DD hh:mm:ss')}</a>], //(text: string) => <a>{dayjs(text).format('YYYY/MM/DD hh:mm:ss')}</a>],
    ['类型名称', 'name', (text: string, record: any, index: number) => <span>{record.schema.title}</span>],
    ['标签', 'tags', (tags: string[] = ['tag1']) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)], //(tags: string[]) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
    ['类型', 'template', () => '√'], //(template: boolean) => (template ? '√' : '×')],
    [
      '',
      '',
      (text: string, record: any, index: number) => (
        <>
          <Icon type="icon-edit" onClick={_ => history.push('/schema/' + record.id)} />
          <Icon type="icon-delete" onClick={_ => deleteById(record)} />
        </>
      ),
      100,
    ],
  ])

  return (
    <Page className="schema" title="UDO-Board | 类型管理">
      <Card
        title={
          <>
            <span className="text">类型</span>
            {/* <Input value={searchText} onChange={e => setSearchText(e.target.value)} /> */}
          </>
        }
        extra={
          <>
            {/* <Input value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} />
            <Tooltip overlay="从 URL 导入">
              <Icon type="icon-import" onClick={_ => sourceUrl !== '' && setVisible(true)} />
            </Tooltip> */}
            <Modal
              visible={visible}
              onCancel={_ => setVisible(false)}
              onOk={_ => {
                // create by schemaName & sourceUrl

                setVisible(false)
                createFromUrl()
              }}
            >
              <span>Name </span>
              <Input value={schemaName} onChange={e => setSchemaName(e.target.value)} />
            </Modal>
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
