/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  dev: {
    "/api": {
      // 要代理的地址
      target: "https://121.41.117.26:6200",
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      secure: false, // 如果是 https，但证书是自签名的，需要设置此项
    },
  },
}
