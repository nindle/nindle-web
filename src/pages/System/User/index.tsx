import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { useRef } from 'react'
import type { TableListItem as Role } from '../Role'
import type { CrudModalRef } from './components/CrudModal'
import CrudModal from './components/CrudModal'
import { USER_GENDER, USER_STATUS } from '@/constants'
import { EnumFromMode, EnumUserStatus } from '@/enums'
import { queryUser, updateUser } from '@/services/system/user'

export interface TableListItem {
  id: number
  username: string
  name: string
  avatar: string
  gender: typeof USER_GENDER[number]['value']
  phone: string
  status: typeof USER_STATUS[number]['value']
  department: string
  departmentId: number
  lastLoginAt: string
  roles: Role[]
}

const User = () => {
  const actionRef = useRef<ActionType>()
  const crudModalRef = useRef<CrudModalRef>(null)
  const [modal, contextHolder] = Modal.useModal()

  const handleClickCrud = (mode: EnumFromMode, record?: TableListItem) => {
    crudModalRef?.current?.showModal(mode, record)
  }

  const handleClickUpdateStatus = ({ id, status }: TableListItem) => {
    const isActive = status === EnumUserStatus.ACTIVE
    modal.confirm({
      title: isActive ? '确定禁用？' : '确定启用？',
      content: isActive ? '禁用后账号将不可用。' : '启用后账号恢复正常。',
      onOk: async () => {
        await updateUser(id, { status: isActive ? EnumUserStatus.DISABLED : EnumUserStatus.ACTIVE })
        actionRef.current?.reload()
      },
    })
  }

  const handleClickDelete = (id: number) => {
    modal.confirm({
      title: '确定删除？',
      content: '删除后账号将不可使用。',
      onOk: async () => {
        await updateUser(id, { isDeleted: true })
        actionRef.current?.reload()
      },
    })
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '账号',
      dataIndex: 'username',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        options: USER_GENDER,
      },
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        options: USER_STATUS,
      },
    },
    {
      title: '创建人',
      dataIndex: 'createdBy',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="update" onClick={() => handleClickCrud(EnumFromMode.UPDATE, record)}>编辑</a>,
        <a key="status" onClick={() => handleClickUpdateStatus(record)}>{ record.status === EnumUserStatus.ACTIVE ? '禁用' : '启用' }</a>,
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
        columns={columns}
        headerTitle="用户列表"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button type="primary" key="create" onClick={() => handleClickCrud(EnumFromMode.CREATE)}>新增用户</Button>,
        ]}
        request={async (params = {}) => {
          const response = await queryUser(params) as any
          const { data: { data, total }, success } = response
          return {
            data,
            total,
            success,
          }
        }}
      />

      <CrudModal ref={crudModalRef} onReload={() => actionRef.current?.reload()} />
    </>
  )
}

export default User
