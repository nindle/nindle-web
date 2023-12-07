import React, { useEffect, useState } from 'react'
import type { FormInstance } from 'antd'
import { Button, Checkbox, Form, Input, message } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { history, useModel } from '@umijs/max'
import { flushSync } from 'react-dom'
import beamsCoverImg from '@/assets/images/beams-cover.jpg'
import { login } from '@/services/login'
import { setAccessToken, setRefreshToken } from '@/utils/auth'
import { EnumStorageKey } from '@/enums'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'

interface Credentials {
  username?: string
  password?: string
  remember?: boolean
}

const Login = () => {
  const formRef = React.useRef<FormInstance>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [remember, setRemember] = useState(false)
  const { initialState, setInitialState } = useModel('@@initialState')

  useEffect(() => {
    const credentials: Credentials = getLocal(EnumStorageKey.CREDENTIALS) || {}
    const { username, password, remember = false } = credentials

    if (username)
      formRef.current?.setFieldsValue({ username, password })

    setRemember(remember)
  }, [])

  const handleChangeRemember = (e: CheckboxChangeEvent) => {
    setRemember(e.target.checked)
  }

  const handleClickForget = () => {
    messageApi.info('请联系管理员重置密码')
  }

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      flushSync(() => {
        setInitialState(s => ({
          ...s,
          currentUser: userInfo,
        }))
      })
    }
  }

  const handleSubmit = async (values: any) => {
    if (remember)
      setLocal(EnumStorageKey.CREDENTIALS, { ...values, remember })
    else
      removeLocal(EnumStorageKey.CREDENTIALS)

    const response = await login(values)
    const { accessToken, refreshToken } = response.data
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    messageApi.success('登录成功！')

    await fetchUserInfo()
    const urlParams = new URL(window.location.href).searchParams
    history.push(urlParams.get('redirect') || '/')
  }

  return (
    <div className="overflow-hidden relative flex h-full px-4 py-8 sm:px-6 lg:px-8">
      {contextHolder}

      <img src={beamsCoverImg} className="absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none" />
      <div className="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" x="100%" patternTransform="translate(0 -1)">
              <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
        </svg>
      </div>

      <div className="relative flex flex-1 flex-col justify-center items-center pt-12 pb-36">
        <div className="mx-auto mb-12 w-auto h-6 text-2xl text-slate-900">Adminify</div>
        <Form
          ref={formRef}
          className="w-full max-w-sm"
          layout="vertical"
          size="large"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <div className="flex justify-between items-center mb-6">
            <Checkbox checked={remember} onChange={handleChangeRemember}>记住我</Checkbox>
            <a onClick={handleClickForget}>忘记密码</a>
          </div>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
