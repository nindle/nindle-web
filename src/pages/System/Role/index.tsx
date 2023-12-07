import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { useRef } from 'react'
import type { TableListItem as Permission } from '../Permission'
import type { CrudModalRef } from './components/CrudModal'
import CrudModal from './components/CrudModal'
import { deleteRole, queryRole } from '@/services/system/role'
import { EnumFromMode } from '@/enums'

export interface TableListItem {
  id: number
  name: string
  description: string
  permissions: Permission[]
}

const Role = () => {
  const actionRef = useRef<ActionType>()
  const crudModalRef = useRef<CrudModalRef>(null)
  const [modal, contextHolder] = Modal.useModal()

  const handleClickCrud = (mode: EnumFromMode, record?: TableListItem) => {
    crudModalRef?.current?.showModal(mode, record)
  }

  const handleClickDelete = (id: number) => {
    modal.confirm({
      title: '确定删除？',
      content: '删除后无法恢复。',
      onOk: async () => {
        await deleteRole(id)
        actionRef.current?.reload()
      },
    })
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '创建人',
      dataIndex: 'createdBy',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="update" onClick={() => handleClickCrud(EnumFromMode.UPDATE, record)}>编辑</a>,
        <a key="delete" onClick={() => handleClickDelete(record.id)}>删除</a>,
      ],
    },
  ]

  return (
    <>
      {contextHolder}
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        search={false}
        columns={columns}
        headerTitle="角色列表"
        toolBarRender={() => [
          <Button type="primary" key="create" onClick={() => handleClickCrud(EnumFromMode.CREATE)}>新增角色</Button>,
        ]}
        pagination={false}
        request={async () => {
          const response = await queryRole() as any
          const { data, success } = response
          return {
            data,
            success,
          }
        }}
      />

      <CrudModal ref={crudModalRef} onReload={() => actionRef.current?.reload()} />
    </>
  )
}

export default Role
