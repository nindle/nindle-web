import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ModalForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Form } from 'antd'
import type { TableListItem } from '../index'
import { MODAL_WIDTH_SMALL, USER_GENDER } from '@/constants'
import { EnumFromMode } from '@/enums'
import { getModalTitleByFormMode } from '@/utils/modal'
import { createUser, updateUser } from '@/services/system/user'
import { queryRole } from '@/services/system/role'

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
  const [roleList, setRoleList] = useState([])

  const fetchRoleList = async () => {
    const response = await queryRole()
    setRoleList(response.data)
  }

  useEffect(() => {
    fetchRoleList()
  }, [])

  const showModal = (mode: EnumFromMode, record?: TableListItem) => {
    setMode(mode)
    setCurrentRecord(record)
    form.setFieldsValue({
      ...record,
      roles: record?.roles.map(i => i.id),
    })
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
      title={getModalTitleByFormMode(mode, '用户')}
      form={form}
      width={MODAL_WIDTH_SMALL}
      layout="horizontal"
      labelCol={{ span: 4 }}
      readonly={mode === EnumFromMode.READ}
      open={isOpen}
      onOpenChange={hideModal}
      onFinish={async (value) => {
        currentRecord ? await updateUser(currentRecord.id, value) : await createUser(value)
        hideModal(false)
        onReload()
      }}
    >
      <ProFormText
        name="username"
        label="账号"
        rules={[{ required: true, message: '请输入账号' }]}
      />
      { mode === EnumFromMode.CREATE && <ProFormText.Password
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      />}
      <ProFormText
        name="name"
        label="姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
      />
      <ProFormRadio.Group
        name="gender"
        label="性别"
        options={USER_GENDER}
        rules={[{ required: true, message: '请选择性别' }]}
      />
      <ProFormText
        name="phone"
        label="手机号"
      />
      <ProFormSelect
        name="roles"
        label="角色"
        fieldProps={{
          mode: 'multiple',
          allowClear: true,
          options: roleList,
          fieldNames: { label: 'name', value: 'id' },
        }}
        rules={[{ required: true, message: '请选择角色' }]}
      />
    </ModalForm>
  )
})

export default CrudModal
