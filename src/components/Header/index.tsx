import { history } from "@umijs/max"
import { useEffect, useState } from "react"
import routes from "../../../config/routes"
import logo from "../../favicon.svg"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavigation = (path: string) => {
    history.push(path)
    setMobileMenuOpen(false)
  }

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all py-2 duration-300 ${
      isScrolled ? "bg-gray-900/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Nindle Logo" className="w-[40px] h-[40px] rounded-[5px]" />
          <div className="text-white text-xl font-medium ml-3">
            Nindle
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {routes
            .filter((e) => e.name)
            .map((item, index) => (
              <div
                className={`mx-4 px-2 py-1 cursor-pointer text-center text-white text-base font-medium hover:text-blue-400 transition-colors ${
                  window.location.pathname === item.path ? "border-b-2 border-blue-500" : ""
                }`}
                key={index}
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </div>
            ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
          <div className="px-4 py-3 space-y-2">
            {routes
              .filter((e) => e.name)
              .map((item, index) => (
                <div
                  className={`block py-3 px-4 text-base font-medium cursor-pointer ${
                    window.location.pathname === item.path ? "text-blue-400" : "text-white"
                  }`}
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
