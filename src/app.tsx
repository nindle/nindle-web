import type { Settings as LayoutSettings } from '@ant-design/pro-components'
import type { RunTimeLayoutConfig } from '@umijs/max'
import { history } from '@umijs/max'
import defaultSettings from '../config/defaultSettings'
import { errorConfig } from './requestErrorConfig'
import { LOGIN_PATH } from '@/constants'
import { getUserProfile } from '@/services/system/user'
import { AvatarDropdown, AvatarName } from '@/components/HeaderRight'

export interface InitialState {
  loading?: boolean
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 */
export async function getInitialState(): Promise<InitialState> {
  const fetchUserInfo = async () => {
    try {
      const response = await getUserProfile()
      return response.data
    }
    catch (error) {
      history.push(LOGIN_PATH)
    }
    return undefined
  }

  // 如果不是登录页面，执行
  const { location } = history
  if (location.pathname !== LOGIN_PATH) {
    const currentUser = await fetchUserInfo()
    return {
      settings: defaultSettings as Partial<LayoutSettings>,
      currentUser,
      fetchUserInfo,
    }
  }

  return {
    settings: defaultSettings as Partial<LayoutSettings>,
    fetchUserInfo,
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      },
    },
    menu: {
      locale: false,
    },
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== LOGIN_PATH)
        history.push(LOGIN_PATH)
    },
    ...initialState?.settings,
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
}
