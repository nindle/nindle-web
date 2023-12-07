import { forwardRef, useImperativeHandle, useState } from 'react'
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Form } from 'antd'
import type { TableListItem } from '../index'
import { MODAL_WIDTH_SMALL } from '@/constants'
import { EnumFromMode } from '@/enums'
import { createDepartment, updateDepartment } from '@/services/system/department'
import { getModalTitleByFormMode } from '@/utils/modal'

export interface CrudModalRef {
  showModal: (mode: EnumFromMode, record?: TableListItem) => void
}

export interface CrudModalProps {
  onReload: () => void
}

const CrudModal = forwardRef<CrudModalRef, CrudModalProps>((props, ref) => {
  const { onReload } = props

  const [form] = Form.useForm()
  const [mode, setMode] = useState<EnumFromMode>()
  const [currentRecord, setCurrentRecord] = useState<TableListItem | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false)

  const showModal = (mode: EnumFromMode, record?: TableListItem) => {
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
      title={getModalTitleByFormMode(mode, '部门')}
      form={form}
      width={MODAL_WIDTH_SMALL}
      layout="horizontal"
      labelCol={{ span: 4 }}
      readonly={mode === EnumFromMode.READ}
      open={isOpen}
      onOpenChange={hideModal}
      onFinish={async (value) => {
        currentRecord ? await updateDepartment(currentRecord.id, value) : await createDepartment(value)
        hideModal(false)
        onReload()
      }}
    >
      <ProFormText
        name="name"
        label="名称"
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <ProFormText name="description" label="描述" />
      <ProFormSelect
        name="leader"
        label="负责人"
        fieldProps={{
          options: [],
        }}
        // rules={[{ required: true, message: '请选择负责人' }]}
      />
      <ProFormSelect
        name="dataStaff"
        label="资料员"
        fieldProps={{
          options: [],
        }}
      />
      <ProFormSelect
        name="financialStaff"
        label="财务人员"
        fieldProps={{
          options: [],
        }}
      />
    </ModalForm>
  )
})

export default CrudModal
