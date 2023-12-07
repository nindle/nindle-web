import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Modal } from 'antd'
import { useRef } from 'react'
import type { Customer } from '../types'
import type { ViewModalRef } from '../components/ViewModal'
import ViewModal from '../components/ViewModal'
import { CUSTOMER_CATEGORY, CUSTOMER_SOURCE } from '@/constants/dictionary'
import { updateFollower } from '@/services/customer'
import { queryLead } from '@/services/customer/lead'

const PublicCustomer = () => {
  const actionRef = useRef<ActionType>()
  const viewModalRef = useRef<ViewModalRef>(null)

  const [modal, contextHolder] = Modal.useModal()

  const handleClickView = (record: Customer) => {
    viewModalRef?.current?.showModal(record)
  }

  const handleClickTransfer = (record: Customer) => {
    modal.confirm({
      title: '确定转成我的客户？',
      content: '转入后请在我的客户中查看。',
      onOk: async () => {
        await updateFollower(record.id)
        actionRef.current?.reload()
      },
    })
  }

  const columns: ProColumns<Customer>[] = [
    {
      title: '联系人',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '微信号',
      dataIndex: 'wechat',
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '线索来源',
      dataIndex: 'source',
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        options: CUSTOMER_SOURCE,
      },
    },
    {
      title: '需求分类',
      dataIndex: 'category',
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        options: CUSTOMER_CATEGORY,
      },
    },
    {
      title: '创建人',
      dataIndex: 'createdBy',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '最新跟进内容',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => record.followRecords?.[0]?.followContent,
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
      title: '备注',
      dataIndex: 'remarks',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      width: 160,
      valueType: 'option',
      render: (_, record) => [
        <a key="read" onClick={() => handleClickView(record)}>查看</a>,
        <a key="transfer" onClick={() => handleClickTransfer(record)}>转为我的线索</a>,
      ],
    },
  ]

  return (
    <>
      {contextHolder}
      <ProTable<Customer>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        headerTitle="公海线索"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          showQuickJumper: true,
        }}
        params={{ page: 'PUBLIC' }}
        request={async (params = {}) => {
          const response = await queryLead(params) as any
          const { data: { data, total }, success } = response
          return {
            data,
            total,
            success,
          }
        }}
      />

      <ViewModal ref={viewModalRef} onReload={() => actionRef.current?.reload()}/>
    </>
  )
}

export default PublicCustomer
