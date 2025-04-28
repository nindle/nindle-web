import { history, useLocation } from "@umijs/max"
import { useEffect, useState } from "react"
import routes from "../../../config/routes"
import logo from "../../favicon.svg"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()


  const handleNavigation = (path: string) => {
    history.push(path)
    setMobileMenuOpen(false)
  }

  // 使用useLocation获取当前路径，优化路径匹配逻辑
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }

    // 完整路径匹配或直接子路径匹配（避免/notes匹配到/notesxyz这样的情况）
    return location.pathname === path ||
           (location.pathname.startsWith(path) &&
            (location.pathname[path.length] === '/' || location.pathname.length === path.length))
  }

  return (
    <header className={`w-full fixed h-full top-0 left-0 z-50 transition-all duration-300`}>
      <div className="max-w-[1440px] h-full px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer h-full" onClick={() => handleNavigation('/')}>
          <img src={logo} alt="Nindle Logo" className="w-[36px] h-[36px] rounded-[5px]" />
          <div className="text-white text-xl font-medium ml-3">
            Nindle
          </div>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center h-full">
          {routes
            .filter((e) => e.name)
            .map((item, index) => {
              const active = isActive(item.path);
              return (
                <div
                  className={`mx-4 px-3 h-full flex items-center justify-center cursor-pointer text-center text-white font-medium transition-all duration-300 relative ${
                    active
                      ? "text-blue-300 font-semibold"
                      : "hover:text-blue-400"
                  }`}
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span>{item.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                  )}
                </div>
              );
            })}
        </nav>

        {/* 移动菜单按钮 */}
        <div className="md:hidden">
          <button
            className="text-white p-2 flex items-center justify-center bg-gray-900 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="切换菜单"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动导航 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
          <div className="px-4 py-3 space-y-2">
            {routes
              .filter((e) => e.name)
              .map((item, index) => {
                const active = isActive(item.path);
                return (
                  <div
                    className={`block py-3 px-4 text-base font-medium cursor-pointer transition-all duration-200 ${
                      active
                        ? "text-blue-400 bg-blue-900/30 rounded-md pl-6"
                        : "text-white hover:bg-gray-800/30 hover:pl-5 rounded-md"
                    }`}
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.name}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
