import type { Settings as LayoutSettings } from "@ant-design/pro-components"
import type { RunTimeLayoutConfig } from "@umijs/max"
import defaultSettings from "../config/defaultSettings"
import { errorConfig } from "./requestErrorConfig"
import Header from "@/components/Header"
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
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    menu: {
      locale: false,
    },
    layout: "top",
    fixedHeader: true,
    token: {
      pageContainer: {
        paddingBlockPageContainerContent: 0,
        paddingInlinePageContainerContent: 0,
      },
    },
    headerRender: () => <Header />,
    // ...initialState?.settings,
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  baseURL: "https://121.41.117.26:6200",
  ...errorConfig,
}
