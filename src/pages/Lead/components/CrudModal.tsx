import { forwardRef, useImperativeHandle, useState } from 'react'
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Form } from 'antd'
import type { Customer } from '../types'
import { CUSTOMER_CATEGORY, CUSTOMER_SOURCE } from '@/constants/dictionary'
import { MODAL_WIDTH } from '@/constants/modal'
import { EnumFromMode } from '@/enums'
import { getModalTitleByFormMode } from '@/utils/modal'
import { createCustomer, updateCustomer } from '@/services/customer'

export interface CrudModalRef {
  showModal: (mode: EnumFromMode, record?: Customer) => void
}

export interface CrudModalProps {
  onReload: () => void
}

const CrudModal = forwardRef<CrudModalRef, CrudModalProps>((props, ref) => {
  const { onReload } = props

  const [form] = Form.useForm()
  const [mode, setMode] = useState<EnumFromMode>()
  const [currentRecord, setCurrentRecord] = useState<Customer | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false)

  const showModal = (mode: EnumFromMode, record?: Customer) => {
    setMode(mode)
    setCurrentRecord(record)
    form.setFieldsValue(record)
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
      title={getModalTitleByFormMode(mode, '客户')}
      form={form}
      width={MODAL_WIDTH}
      layout="horizontal"
      grid={true}
      colProps={{ span: 12 }}
      labelCol={{ span: 6 }}
      readonly={mode === EnumFromMode.READ}
      open={isOpen}
      onOpenChange={setIsOpen}
      onFinish={async (value) => {
        currentRecord ? await updateCustomer(currentRecord.id, value) : await createCustomer(value)
        hideModal(false)
        onReload()
      }}
    >
      <ProFormText
        name="name"
        label="客户名称"
        placeholder="请输入客户名称"
        rules={[{ required: true, message: '请输入客户名称' }]}
      />
      <ProFormText
        name="location"
        label="所在地区"
        placeholder="请选择所在地区"
        // rules={[{ required: true, message: '请选择所在地区' }]}
      />
      <ProFormText
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
      />
      <ProFormText
        name="wechat"
        label="微信号"
        placeholder="请输入微信号"
      />
      <ProFormSelect
        name="source"
        label="线索来源"
        placeholder="请选择线索来源"
        fieldProps={{
          options: CUSTOMER_SOURCE,
        }}
        rules={[{ required: true, message: '请选择线索来源' }]}
      />
      <ProFormSelect
        name="category"
        label="需求分类"
        placeholder="请选择需求分类"
        fieldProps={{
          options: CUSTOMER_CATEGORY,
        }}
        rules={[{ required: true, message: '请选择需求分类' }]}
      />
      <ProFormTextArea
        name="remarks"
        label="备注"
        placeholder="请输入备注"
        labelCol={{ span: 3 }}
        colProps={{ span: 24 }}
      />
    </ModalForm>
  )
})

export default CrudModal
