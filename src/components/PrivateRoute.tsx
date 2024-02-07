import { useAuth } from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const user = useAuth()
  if (!user.user) return <Navigate to="sign-in" replace />
  else return <Outlet />
}

export default PrivateRoute
