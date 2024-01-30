import { useAuth } from "../hooks/useAuth"

const Home = () => {
  const { user } = useAuth()
  return <div>User {user?.username} logged in</div>
}

export default Home
