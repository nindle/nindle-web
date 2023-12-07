/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/login',
    name: '登录',
    layout: false,
    component: './Login',
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'HomeOutlined',
    component: './Welcome',
  },
  {
    path: '/lead',
    name: '线索管理',
    icon: 'BranchesOutlined',
    access: 'lead',
    routes: [
      {
        path: '/lead/my',
        name: '我的线索',
        access: 'lead:my',
        component: './Lead/My',
      },
      {
        path: '/lead/public',
        name: '公海线索',
        access: 'lead:public',
        component: './Lead/Public',
      },
      {
        path: '/lead/invalid',
        name: '无效线索',
        access: 'lead:invalid',
        component: './Lead/Invalid',
      },
    ],
  },
  {
    path: '/customer',
    name: '客户管理',
    icon: 'TeamOutlined',
    access: 'customer',
    routes: [
      {
        path: '/customer/my',
        name: '我的客户',
        access: 'customer:my',
        component: './Customer/My',
      },
      {
        path: '/customer/list',
        name: '客户列表',
        access: 'customer:list',
        component: './Customer/List',
      },
      {
        path: '/customer/public',
        name: '公海客户',
        access: 'customer:public',
        component: './Customer/Public',
      },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'AuditOutlined',
    access: 'order',
    routes: [
      {
        path: '/order/list',
        name: '订单列表',
        access: 'order:list',
        component: './Order/List',
      },
      {
        path: '/order/receivable',
        name: '应收款订单',
        access: 'order:receivable',
        component: './Order/Receivable',
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'SettingOutlined',
    access: 'system',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        access: 'system:user',
        component: './System/User',
      },
      {
        path: '/system/role',
        name: '角色管理',
        access: 'system:role',
        component: './System/Role',
      },
      {
        path: '/system/department',
        name: '部门管理',
        access: 'system:department',
        component: './System/Department',
      },
      {
        path: '/system/permission',
        name: '权限管理',
        access: 'system:permission',
        component: './System/Permission',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
]
