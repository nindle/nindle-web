import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'
import { Form } from 'antd'
import type { TableListItem } from '../index'
import { MODAL_WIDTH_SMALL } from '@/constants'
import { EnumFromMode } from '@/enums'
import { createRole, updateRole } from '@/services/system/role'
import { queryPermissionTree } from '@/services/system/permission'
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
    form.setFieldsValue({
      ...record,
      permissions: record?.permissions.map(i => i.id),
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
      title={getModalTitleByFormMode(mode, '角色')}
      form={form}
      width={MODAL_WIDTH_SMALL}
      layout="horizontal"
      labelCol={{ span: 4 }}
      readonly={mode === EnumFromMode.READ}
      open={isOpen}
      onOpenChange={hideModal}
      onFinish={async (value) => {
        const params = {
          ...value,
          permissions: value.permissions.map((i: any) => i.value),
        }
        currentRecord ? await updateRole(currentRecord.id, params) : await createRole(params)
        hideModal(false)
        onReload()
      }}
    >
      <ProFormText
        name="name"
        label="名称"
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <ProFormText
        name="description"
        label="描述"
        rules={[{ required: true, message: '请输入描述' }]}
      />
      <ProFormTreeSelect
        name="permissions"
        label="权限标识"
        fieldProps={{
          treeCheckable: true,
          maxTagCount: 'responsive',
          treeCheckStrictly: true,
          showCheckedStrategy: 'SHOW_ALL',
          fieldNames: { label: 'name', value: 'id', children: 'children' },
          treeData: permissionTree,
        }}
        rules={[{ required: true, message: '请选择权限标识' }]}
      />
    </ModalForm>
  )
})

export default CrudModal
