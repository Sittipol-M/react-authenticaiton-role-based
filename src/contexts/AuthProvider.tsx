import { ReactElement, createContext, useState } from "react"
import { AuthContextValue, User } from "../types/contexts/authProvider"
import { useNavigate } from "react-router-dom"
import { LoginInformation } from "../types/pages/signIn"

export const AuthContext = createContext<AuthContextValue>({})

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | undefined>()
  const [token, setToken] = useState<string>(localStorage.getItem("access-token") || "")
  const navigate = useNavigate()

  const login = async (data: LoginInformation) => {
    try {
      const LOGIN_URL = `${import.meta.env.VITE_API_URL}/authen/login`
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const res = await response.json()
      if (res.user) {
        setUser(res.user)
        setToken(res.accessToken)
        localStorage.setItem("site", res.accessToken)
        navigate("/")
      }
    } catch (err) {
      console.error(err)
    }
  }
  const logout = () => {
    setUser(undefined)
    setToken("")
    localStorage.removeItem("access-token")
    navigate("/sign-in")
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
