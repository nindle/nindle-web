import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { useRef } from 'react'
import type { BaseTableListItem } from '@/types'
import { queryCustomer } from '@/services/customer'

export interface TableListItem extends BaseTableListItem {
  orderId: string
}

const OrderList = () => {
  const actionRef = useRef<ActionType>()

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
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        headerTitle="应收款订单"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          showQuickJumper: true,
        }}
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
    </>
  )
}

export default OrderList
