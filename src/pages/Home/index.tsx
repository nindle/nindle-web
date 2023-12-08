import { memo, useEffect } from "react"
export default memo(() => {
  useEffect(() => {}, [])
  return (
    <div className="w-full h-[110vh] bg-[#202a32]">
      <div className="w-[1440px] m-auto text-[red]">Welcome Nindle !</div>
    </div>
  )
})
