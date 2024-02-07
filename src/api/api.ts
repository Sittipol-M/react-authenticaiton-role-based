import axios from "axios"
import { LoginResponse } from "../types/contexts/authProvider"
import { encryptUser } from "../helpers/functions/encryptUser"
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access-token")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers["Content-Type"] = "application/json"
      config.withCredentials = true
      config.headers.Accept = "application/json"
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const accessToken = localStorage.getItem("access-token")
        const { data }: { data: LoginResponse; status: number } =
          await api.post(
            "/authen/refresh-access-token",
            {
              accessToken,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
        const { accessToken: newAccessToken, user } = data

        localStorage.setItem("access-token", newAccessToken)
        Cookies.set("user", encryptUser(user), {
          expires: 1,
          sameSite: "Strict",
        })

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axios(originalRequest)
      } catch (error) {
        Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default api
