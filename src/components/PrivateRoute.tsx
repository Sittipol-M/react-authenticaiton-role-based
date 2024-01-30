import { useAuth } from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const user = useAuth()
  if (!user.token) return <Navigate to="/sign-in" />
  return <Outlet />
}

export default PrivateRoute
