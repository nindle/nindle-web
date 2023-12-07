import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { ProFormDatePicker, ProFormDependency, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton, StepsForm } from '@ant-design/pro-components'
import { Form, Modal } from 'antd'
import { useModel } from '@umijs/max'
import dayjs from 'dayjs'
import { ProjectInsurance, ProjectType } from '../../dictionaries'
import { createCustomer, queryCustomer } from '@/services/customer'
import { MODAL_WIDTH_MAX } from '@/constants'
import type { Customer } from '@/pages/Customer/types'

export interface CreateModalRef {
  showModal: () => void
}

export interface CreateModalProps {
  onReload: () => void
}

const CreateModal = forwardRef<CreateModalRef, CreateModalProps>((props, ref) => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const { onReload } = props

  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)

  const [customerList, setCustomerList] = useState<Customer[] & { label: string; value: number }[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>()

  const fetchCustomerList = async () => {
    const response = await queryCustomer({ pageSize: 10, current: 1, page: 'MY' })
    setCustomerList(response.data.data)
  }

  const handleSelectCustomer = (value: number) => {
    const currentCustomer = customerList.find(i => i.id === value)
    if (currentCustomer)
      setCurrentCustomer(currentCustomer)
  }

  const showModal = () => {
    setIsOpen(true)
    fetchCustomerList()
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
    <StepsForm
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            title="创建订单"
            width={MODAL_WIDTH_MAX}
            onCancel={() => hideModal(false)}
            open={isOpen}
            footer={submitter}
            destroyOnClose
          >
            {dom}
          </Modal>
        )
      }}
      onFinish={async (value) => {
        await createCustomer(value)
        hideModal(false)
        onReload()
      }}
    >
      <StepsForm.StepForm
        name="1"
        title="选择客户"
        layout="horizontal"
        colProps={{ span: 12 }}
        labelCol={{ span: 6 }}
        onFinish={async () => {
          return true
        }}
      >
        <ProFormSelect
          name="customerId"
          label="选择客户"
          tooltip="必须是意向客户且没有创建过订单"
          placeholder="请选择客户"
          fieldProps={{
            options: customerList,
            fieldNames: { label: 'name', value: 'id' },
            onSelect: handleSelectCustomer,
          }}
          rules={[{ required: true, message: '请选择客户' }]}
        />
        {currentCustomer && (
          <>
            <ProFormText label="客户归属部门" readonly={true} />
            <ProFormText label="联系电话" readonly={true} fieldProps={{ value: currentCustomer.phone }} />
            <ProFormText label="地址" readonly={true} />
          </>
        )}
      </StepsForm.StepForm>

      <StepsForm.StepForm
        name="2"
        title="合同信息"
        grid={true}
        layout="horizontal"
        colProps={{ span: 12 }}
        labelCol={{ span: 6 }}
        onFinish={async () => {
          return true
        }}
      >
        <ProFormUploadButton
          label="上传合同文件"
          name="upload"
          labelCol={{ span: 3 }}
          colProps={{ span: 24 }}
          rules={[{ required: true, message: '请上传合同文件' }]}
        />
        <ProFormText
          name="id"
          label="合同编号"
          placeholder="请输入合同编号"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="price"
          label="合同价格（元）"
          placeholder="请输入合同价格"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="fxfl"
          label="项目分险分类"
          placeholder="请选择项目分险分类"
          options={ProjectInsurance}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="qyr"
          label="客户签约人"
          placeholder="请输入客户签约人"
          rules={[{ required: true }]}
        />
        <ProFormText
          label="我方签约人"
          readonly={true}
          fieldProps={{ value: currentUser?.name }}
        />
        <ProFormText
          label="我方签约主体"
          readonly={true}
          fieldProps={{ value: '河南华友' }}
        />
        <ProFormRadio.Group
          name="gender"
          label="是否含税"
          tooltip="不含税的项目无法开票"
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="税率"
          readonly={true}
          fieldProps={{ value: '3.36%' }}
        />
        <ProFormDatePicker
          name="contractSigningDate"
          label="合同签约日期"
          placeholder="请选择合同签约日期"
          fieldProps={{ style: { width: '100%' } }}
          rules={[{ required: true, message: '请选择合同签约日期' }]}
        />
        <ProFormSelect
          name="timingType"
          label="计时类型"
          placeholder="请选择计时类型"
          options={[
            { label: '工作日', value: 1 },
            { label: '自然日', value: 2 },
          ]}
          initialValue={1}
          rules={[{ required: true, message: '请选择计时类型' }]}
        />
        <ProFormText
          name="processingDuration"
          label="办理时长（天）"
          placeholder="请输入办理时长"
          initialValue={120}
          rules={[{ required: true }]}
        />
        <ProFormDependency name={['contractSigningDate', 'timingType', 'processingDuration']}>
          {({ contractSigningDate, timingType, processingDuration }) => {
            let contractEndDate
            if (contractSigningDate && timingType && processingDuration) {
              let endDate = dayjs(contractSigningDate)
              if (timingType === 2) {
                endDate = endDate.add(processingDuration, 'day')
              }
              else {
                const weekdays = [1, 2, 3, 4, 5]
                while (processingDuration > 0) {
                  endDate = endDate.add(1, 'day')
                  if (weekdays.includes(endDate.day()))
                    processingDuration--
                }
              }
              contractEndDate = dayjs(endDate)
            }

            return (
              <ProFormDatePicker
                name="contractEndDate"
                label="合同结束日期"
                placeholder="请选择合同结束日期"
                disabled={true}
                fieldProps={{
                  style: { width: '100%' },
                  value: contractEndDate,
                }}
                rules={[{ required: true, message: '请选择合同结束日期' }]}
              />
            )
          }}
        </ProFormDependency>
        <ProFormSelect
          name="type"
          label="项目类型"
          placeholder="请选择项目类型"
          options={ProjectType}
          rules={[{ required: true, message: '请选择项目类型' }]}
        />
        <ProFormRadio.Group
          name="pctk"
          label="违约赔偿条款"
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          name="isModifiedContractTerms"
          label="修改合同条款"
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          fieldProps={{
            defaultValue: false,
          }}
          rules={[{ required: true }]}
        />
        <ProFormDependency name={['isModifiedContractTerms']}>
          {({ isModifiedContractTerms }) => {
            return (
              isModifiedContractTerms && <ProFormTextArea
                name="modifiedContractTermsContent"
                label="修改条款内容"
                placeholder="请输入修改条款内容"
                labelCol={{ span: 3 }}
                colProps={{ span: 24 }}
                rules={[{ required: true, message: '请输入修改条款内容' }]}
              />
            )
          }}
        </ProFormDependency>
        <ProFormTextArea
          name="remarks"
          label="备注"
          placeholder="请输入备注"
          labelCol={{ span: 3 }}
          colProps={{ span: 24 }}
        />
      </StepsForm.StepForm>

      <StepsForm.StepForm
        name="base3"
        title="服务项目及人才配置"
        onFinish={async () => {
          return true
        }}
      >
        <ProFormText
          name="name"
          width="md"
          label="实验名称"
          tooltip="最长为 24 位，用于标定的唯一 id"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
      </StepsForm.StepForm>

      <StepsForm.StepForm
        name="base4"
        title="费用统计及回款计划"
        onFinish={async () => {
          return true
        }}
      >
        <ProFormText
          name="name"
          width="md"
          label="实验名称"
          tooltip="最长为 24 位，用于标定的唯一 id"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  )
})

export default CreateModal
