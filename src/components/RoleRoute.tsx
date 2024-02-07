import { Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import UnAuthorized from "../pages/UnAuthorized"

const RoleRoute = ({ allowRoles }: { allowRoles: string[] }) => {
  const { user } = useAuth()
  if (user) {
    if (allowRoles.includes(user.role)) {
      return <Outlet />
    }
  }

  return <UnAuthorized />
}

export default RoleRoute
