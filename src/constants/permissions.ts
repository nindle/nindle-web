import routes from '../../config/routes'

interface Route {
  path: string
  name?: string
  icon?: string
  access?: string
  layout?: boolean
  component?: string
  routes?: Route[]
  redirect?: string
}

// 使用递归函数来过滤没有 "access" 字段的路由及其子路由
function filterRoutesWithAccess(route: Route): boolean {
  if ('access' in route) {
    if (route.routes) {
      route.routes = route.routes.filter(subRoute => 'access' in subRoute)
      route.routes.forEach(filterRoutesWithAccess)
    }
    return true
  }
  return false
}

// 过滤路由配置数组中没有 "access" 字段的路由及其子路由
const filteredRoutes: Route[] = routes.filter(filterRoutesWithAccess)

export {
  filteredRoutes,
}
