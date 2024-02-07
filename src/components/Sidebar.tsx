import { useAuth } from "../hooks/useAuth"

const Sidebar = () => {
  const { logout } = useAuth()
  return <button onClick={logout}>Logout</button>
}

export default Sidebar
