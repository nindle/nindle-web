import { history } from "@umijs/max"
import routes from "../../../config/routes"

const Header = () => {
  return (
    <>
      <div className="flex m-auto">
        {routes
          .filter((e) => e.name)
          .map((item, index) => {
            return (
              <div
                className="mx-[30px] w-[100px] text-center hover:text-[#a94b4b]"
                key={index}
                onClick={() => history.push(item.path)}
              >
                {item.name}
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Header
