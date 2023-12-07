import { history } from "@umijs/max"
import routes from "../../../config/routes"

const Header = () => {
  return (
    <>
      <div className="flex m-auto">
        {routes.map((item, index) => {
          return (
            <div
              className="mx-[30px]"
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
