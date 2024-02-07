import React, { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { Outlet } from "react-router-dom"

const RefreshPageAuth = () => {
  const { refreshAccessToken } = useAuth()
  useEffect(() => {
    if (refreshAccessToken) refreshAccessToken()
  }, [])
  return <Outlet />
}

export default RefreshPageAuth
