import { history } from "@umijs/max"
import { useEffect, useRef, useState } from "react"
import routes from "../../../config/routes"
import logo from "../../favicon.svg"
import { Input } from "antd"
const { Search } = Input

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <div className={`w-full ${isScrolled ? "header" : ""}`}>
      <div className="flex justify-between items-center w-[1440px] m-auto">
        <div className="flex items-center">
          <img src={logo} alt="" className="w-[40px] h-[40px] rounded-[5px]" />
          <div className="text-[#fff] text-[18px] font-[500] ml-[10px]">
            Nindle
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          {routes
            .filter((e) => e.name)
            .map((item, index) => {
              return (
                <div
                  className="mx-[30px] w-[100px] cursor-pointer text-center text-[#FFF] text-[16px] hover:text-[#a94b4b]"
                  key={index}
                  onClick={() => history.push(item.path)}
                >
                  {item.name}
                </div>
              )
            })}
        </div>

        <div className="w-[20%] flex items-center">
          <Search placeholder="检索站内信息" size="large" className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default Header
