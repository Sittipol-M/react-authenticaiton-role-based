import { Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import SignUp from "./pages/SignUp"
import User from "./pages/User"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="user" element={<User />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
