import { memo, useEffect } from "react"
import { login } from "../../services/login"
export default memo(() => {
  useEffect(() => {
    login({})
  }, [])
  return (
    <div className="w-full ">
      <div className="w-[1440px] h-[130vh] m-auto text-[red]">
        Welcome Nindle !
      </div>
    </div>
  )
})
