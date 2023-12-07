import type { InitialState } from './app'

export default (initialState: InitialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access

  if (initialState.currentUser)
    return initialState.currentUser.permissions
  return {}
}
