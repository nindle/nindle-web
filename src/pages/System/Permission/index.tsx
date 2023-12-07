import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { useRef } from 'react'
import type { CrudModalRef } from './components/CrudModal'
import CrudModal from './components/CrudModal'
import { deletePermission, queryPermissionTree } from '@/services/system/permission'
import { EnumFromMode } from '@/enums'

export interface TableListItem {
  id: number
  name: string
  order: number
  code: string
}

const Permission = () => {
  const actionRef = useRef<ActionType>()
  const crudModalRef = useRef<CrudModalRef>(null)
  const [modal, contextHolder] = Modal.useModal()

  const handleClickCrud = (mode: EnumFromMode, record?: TableListItem) => {
    crudModalRef?.current?.showModal(mode, record)
  }

  const handleClickDelete = (id: number) => {
    modal.confirm({
      title: '确定删除？',
      content: '删除后将连同所属子权限一起被删除，且无法恢复。',
      onOk: async () => {
        await deletePermission(id)
        actionRef.current?.reload()
      },
    })
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '权限标识',
      dataIndex: 'code',
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
        headerTitle="权限列表"
        toolBarRender={() => [
          <Button type="primary" key="create" onClick={() => handleClickCrud(EnumFromMode.CREATE)}>新增权限</Button>,
        ]}
        pagination={false}
        request={async () => {
          const response = await queryPermissionTree() as any
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

export default Permission
