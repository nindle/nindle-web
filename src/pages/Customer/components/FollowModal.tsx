import { forwardRef, useImperativeHandle, useState } from 'react'
import { ModalForm, ProFormDateTimePicker, ProFormSelect, ProFormSwitch, ProFormTextArea } from '@ant-design/pro-components'
import { Form } from 'antd'
import type { Customer } from '../types'
import { FOLLOW_RECORD_TYPE } from '@/constants/dictionary'
import { MODAL_WIDTH_SMALL } from '@/constants/modal'
import { createFollowRecord } from '@/services/customer'

export interface FollowModalRef {
  showModal: (record?: Customer) => void
}

export interface FollowModalProps {
  onReload: () => void
}

const FollowModal = forwardRef<FollowModalRef, FollowModalProps>((props, ref) => {
  const { onReload } = props

  const [form] = Form.useForm()
  const [currentRecord, setCurrentRecord] = useState<Customer | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false)

  const showModal = (record?: Customer) => {
    setCurrentRecord(record)
    setIsOpen(true)
  }

  const hideModal = (open: boolean) => {
    if (!open)
      form.resetFields()
    setIsOpen(open)
  }

  useImperativeHandle(ref, () => ({
    showModal,
  }))

  return (
    <ModalForm
      title="写跟进"
      form={form}
      width={MODAL_WIDTH_SMALL}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      open={isOpen}
      onOpenChange={setIsOpen}
      onFinish={async (value) => {
        await createFollowRecord({ ...value, customerId: currentRecord?.id })
        hideModal(false)
        onReload()
      }}
    >
      <ProFormSelect
        name="type"
        label="跟进方式"
        placeholder="请选择跟进方式"
        fieldProps={{
          options: FOLLOW_RECORD_TYPE,
        }}
        rules={[{ required: true, message: '请选择跟进方式' }]}
      />
      <ProFormSwitch
        name="hasAppointment"
        label="是否已约见"
        checkedChildren="是"
        unCheckedChildren="否"
      />
      <ProFormTextArea
        name="followContent"
        label="跟进内容"
        placeholder="请输入跟进内容"
        rules={[{ required: true, message: '请输入跟进内容' }]}
      />
      <ProFormDateTimePicker
        name="nextFollowAt"
        label="下次跟进时间"
        placeholder="请选择下次跟进时间"
        fieldProps={{
          style: { width: '100%' },
        }}
      />
      <ProFormTextArea
        name="nextFollowContent"
        label="下次跟进内容"
        placeholder="请输入下次跟进内容"
      />
    </ModalForm>
  )
})

export default FollowModal
