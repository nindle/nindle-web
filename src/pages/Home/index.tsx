import { memo, useEffect } from "react"
export default memo(() => {
  useEffect(() => {}, [])
  return (
    <div className="w-full ">
      <div className="w-[1440px] h-[130vh] m-auto text-[red]">
        Welcome Nindle !
      </div>
    </div>
  )
})
