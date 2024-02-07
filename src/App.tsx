import { Navigate, Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import SignUp from "./pages/SignUp"
import User from "./pages/User"
import PrivateRoute from "./components/PrivateRoute"
import RoleRoute from "./components/RoleRoute"
import Sidebar from "./components/Sidebar"
import { useAuth } from "./hooks/useAuth"

const App = () => {
  const { user } = useAuth()
  if (user)
    return (
      <>
        <Sidebar /> 
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowRoles={["Admin"]} />}>
              <Route index element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<User />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </>
    )
  else
    return (
      <>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </>
    )
}

export default App
