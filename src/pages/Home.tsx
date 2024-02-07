import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import api from "../api/api"

const Home = () => {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Array<unknown>>([])

  const handleClickGetCustomers = async () => {
    const response = await api.get("/customers")
    setCustomers(response.data)
  }

  return (
    <>
      <div>User {user?.username} logged in</div>
      <button onClick={handleClickGetCustomers}>Get customers</button>
      <div>
        {customers?.length > 0 && customers[0] ? customers[0].toString() : null}
      </div>
    </>
  )
}

export default Home
