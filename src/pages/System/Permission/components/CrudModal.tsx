import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'
import { Form } from 'antd'
import type { TableListItem } from '../index'
import { MENU_TYPE, MODAL_WIDTH_SMALL } from '@/constants'
import { EnumFromMode } from '@/enums'
import { createPermission, queryPermissionTree, updatePermission } from '@/services/system/permission'
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
  const [permissionTree, setPermissionTree] = useState([])

  const fetchPermissionTree = async () => {
    const response = await queryPermissionTree()
    setPermissionTree(response.data)
  }

  useEffect(() => {
    fetchPermissionTree()
  }, [])

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
      title={getModalTitleByFormMode(mode, '权限')}
      form={form}
      width={MODAL_WIDTH_SMALL}
      layout="horizontal"
      labelCol={{ span: 4 }}
      readonly={mode === EnumFromMode.READ}
      open={isOpen}
      onOpenChange={hideModal}
      onFinish={async (value) => {
        currentRecord ? await updatePermission(currentRecord.id, value) : await createPermission(value)
        hideModal(false)
        fetchPermissionTree()
        onReload()
      }}
    >
      <ProFormText
        name="name"
        label="名称"
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <ProFormTreeSelect
        name="parentId"
        label="上级权限"
        fieldProps={{
          treeData: permissionTree,
          fieldNames: { label: 'name', value: 'id', children: 'children' },
        }}
      />
      <ProFormText
        name="sort"
        label="排序"
        rules={[{ required: true, message: '请输入排序' }]}
      />
      <ProFormText
        name="code"
        label="权限标识"
        rules={[{ required: true, message: '请输入权限标识' }]}
      />
    </ModalForm>
  )
})

export default CrudModal
