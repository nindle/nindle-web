import { forwardRef, useImperativeHandle, useState } from 'react'
import type { TimelineItemProps } from 'antd'
import { Button, Modal, Timeline } from 'antd'
import type { ProColumns } from '@ant-design/pro-components'
import { ProCard, ProDescriptions, ProTable } from '@ant-design/pro-components'
import type { Customer, FollowRecord, OperationRecord } from '../types'
import { CUSTOMER_CATEGORY, CUSTOMER_SOURCE, FOLLOW_RECORD_TYPE, MODAL_WIDTH_MAX } from '@/constants'
import { queryCustomerDetail } from '@/services/customer'
import { OperationRecordType, TimeLineColor } from '@/enums'

export interface ViewModalRef {
  showModal: (record: Customer) => void
}

export interface ViewModalProps {
  onReload: () => void
}

const ViewModal = forwardRef<ViewModalRef, ViewModalProps>((props, ref) => {
  const { onReload } = props

  const [isOpen, setIsOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<Customer | undefined>(undefined)
  const [timeLineItems, setTimeLineItems] = useState<TimelineItemProps[]>([])

  const showModal = async (record: Customer) => {
    setIsOpen(true)
    const response = await queryCustomerDetail(record.id)
    const data = response.data
    setCurrentRecord(data)

    const { operationRecords } = data

    const items = operationRecords.map((record: OperationRecord) => {
      const { type, details, createdAt, createdBy } = record
      return {
        color: TimeLineColor[type],
        children: (
          <>
            <p className="m-0">操作人：{createdBy}</p>
            <p className="m-0">操作类型：{type}</p>
            <p className="m-0">操作时间：{createdAt}</p>
            {details && <p className="m-0">操作内容：{details}</p>}
          </>
        ),
      }
    })
    setTimeLineItems(items)
  }

  const hideModal = (open: boolean) => {
    setIsOpen(open)
  }

  useImperativeHandle(ref, () => ({
    showModal,
  }))

  const descriptionColumns = [
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
    },
    {
      title: '微信号',
      dataIndex: 'wechat',
      copyable: true,
      ellipsis: true,
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
    },
    {
      title: '跟进人',
      dataIndex: 'follower',
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
      title: '备注',
      dataIndex: 'remarks',
      ellipsis: true,
    },
  ]

  const columns: ProColumns<FollowRecord>[] = [
    {
      title: '跟进方式',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        options: FOLLOW_RECORD_TYPE,
      },
    },
    {
      title: '是否已约见',
      dataIndex: 'hasAppointment',
      render: (_, record) => record.hasAppointment ? '是' : '否',
    },
    {
      title: '跟进内容',
      dataIndex: 'followContent',
      ellipsis: true,
    },
    {
      title: '下次跟进时间',
      dataIndex: 'nextFollowAt',
      ellipsis: true,
    },
    {
      title: '下次跟进内容',
      dataIndex: 'nextFollowContent',
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
  ]

  return (
    <Modal
      title="查看客户"
      open={isOpen}
      width={MODAL_WIDTH_MAX}
      footer={[<Button key="cancel" onClick={() => hideModal(false)}>关闭</Button>]}
      onCancel={() => hideModal(false)}
    >
      <ProCard split="vertical">
        <ProCard colSpan="70%" bodyStyle={{ paddingInlineStart: 0, paddingBlockStart: 0 }}>
          <ProDescriptions
            title="客户信息"
            emptyText={'-'}
            size="small"
            columns={descriptionColumns}
            dataSource={currentRecord}
          />

          <ProTable<FollowRecord>
            rowKey="id"
            columns={columns}
            headerTitle="跟进记录"
            search={false}
            options={false}
            pagination={false}
            size="small"
            cardBordered
            scroll={{ y: 180 }}
            toolBarRender={() => [
              <Button key="create" type="primary" size="small">写跟进</Button>,
            ]}
            className="mt-4"
            dataSource={currentRecord?.followRecords}
          />
        </ProCard>
        <ProCard title="操作记录" headStyle={{ paddingBlock: 0 }}>
          <div className="overflow-y-auto py-4" style={{ height: 440 }}>
            <Timeline items={timeLineItems} />
          </div>
        </ProCard>
      </ProCard>
    </Modal>
  )
})

export default ViewModal
