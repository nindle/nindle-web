import { stringify } from 'querystring'
import { history, useModel } from '@umijs/max'
import type { MenuProps } from 'antd'
import { Dropdown, Spin } from 'antd'
import { flushSync } from 'react-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { removeAccessToken, removeRefreshToken } from '@/utils/auth'

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  return <span>{currentUser?.name}</span>
}

// eslint-disable-next-line react/prop-types
export const AvatarDropdown: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { initialState, setInitialState } = useModel('@@initialState')

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = () => {
    removeAccessToken()
    removeRefreshToken()

    const { search, pathname } = window.location
    const urlParams = new URL(window.location.href).searchParams
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect')
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/login',
        search: stringify({
          redirect: pathname + search,
        }),
      })
    }
  }

  const handleClickMenu: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      flushSync(() => {
        setInitialState(s => ({ ...s, currentUser: undefined }))
      })
      loginOut()
    }
  }

  const loading = (
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  )

  if (!initialState)
    return loading

  const { currentUser } = initialState

  if (!currentUser || !currentUser.name)
    return loading

  const menuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleClickMenu,
      }}
    >
      {children}
    </Dropdown>
  )
}
