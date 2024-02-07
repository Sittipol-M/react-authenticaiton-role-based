import { ReactElement, createContext, useState } from "react"
import {
  AuthContextValue,
  LoginResponse,
  User,
} from "../types/contexts/authProvider"
import { useNavigate } from "react-router-dom"
import { LoginInformation } from "../types/pages/signIn"
import Cookies from "js-cookie"
import { encryptUser } from "../helpers/functions/encryptUser"
import { decryptUser } from "../helpers/functions/decryptUser"
import api from "../api/api"

export const AuthContext = createContext<AuthContextValue>({})

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(
    decryptUser(Cookies.get("user") || "")
  )
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access-token")
  )

  const navigate = useNavigate()

  const login = async (loginInformation: LoginInformation) => {
    try {
      const { data }: { data: LoginResponse; status: number } = await api.post(
        "/authen/login",
        loginInformation,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )

      const { accessToken, user } = data
      setUser(user)
      setAccessToken(accessToken)
      localStorage.setItem("access-token", accessToken)
      Cookies.set("user", encryptUser(user), {
        expires: 1,
        sameSite: "Strict",
      })
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }
  const logout = () => {
    setUser(null)
    navigate("/sign-in")
  }

  const refreshAccessToken = async () => {
    try {
      const response = await api.post("/authen/refresh-access-token", null, {
        withCredentials: true,
      })
      console.log({ response })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, user, refreshAccessToken, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
