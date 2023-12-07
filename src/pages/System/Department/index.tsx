import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { useRef } from 'react'
import type { CrudModalRef } from './components/CrudModal'
import CrudModal from './components/CrudModal'
import { deleteDepartment, queryDepartmentList } from '@/services/system/department'
import { EnumFromMode } from '@/enums'

export interface TableListItem {
  id: number
  name: string
  description?: string
  leader?: string
  leaderId?: number
  dataStaff?: string
  dataStaffId?: number
  financialStaff?: string
  financialStaffId?: number
}

const Department = () => {
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
        await deleteDepartment(id)
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
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      ellipsis: true,
    },
    {
      title: '资料员',
      dataIndex: 'dataStaff',
      ellipsis: true,
    },
    {
      title: '财务人员',
      dataIndex: 'financialStaff',
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
        headerTitle="部门列表"
        toolBarRender={() => [
          <Button type="primary" key="create" onClick={() => handleClickCrud(EnumFromMode.CREATE)}>新增部门</Button>,
        ]}
        pagination={false}
        request={async (params = {}) => {
          const response = await queryDepartmentList(params) as any
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

export default Department
