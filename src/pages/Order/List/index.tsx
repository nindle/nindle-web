import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { useRef } from 'react'
import type { CreateModalRef } from './components/CreateModal'
import CreateModal from './components/CreateModal'
import type { BaseTableListItem } from '@/types'
import { queryCustomer } from '@/services/customer'

export interface TableListItem extends BaseTableListItem {
  orderId: string
}

const OrderList = () => {
  const actionRef = useRef<ActionType>()
  const createModalRef = useRef<CreateModalRef>(null)

  const [modal, contextHolder] = Modal.useModal()

  const handleClickCreate = () => {
    createModalRef.current?.showModal()
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderId',
      ellipsis: true,
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
  ]

  return (
    <>
      {contextHolder}
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        headerTitle="订单列表"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button type="primary" key="create" onClick={() => handleClickCreate()}>创建订单</Button>,
        ]}
        params={{ page: 'MY' }}
        request={async (params = {}) => {
          const response = await queryCustomer(params) as any
          const { data: { data, total }, success } = response
          return {
            data,
            total,
            success,
          }
        }}
      />

      <CreateModal ref={createModalRef} onReload={() => actionRef.current?.reload()} />
    </>
  )
}

export default OrderList
