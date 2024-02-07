import { LoginInformation } from "../../pages/signIn"

export interface User {
  username: string
  role: string
}

export interface AuthContextValue {
  user?: User | null
  accessToken?: string | null
  login?: (data: LoginInformation) => Promise<void>
  refreshAccessToken?: () => Promise<void>
  logout?: () => void
}

export type Role = "Admin" | "User"
export interface LoginResponse {
  accessToken: string
  user: {
    username: string
    role: Role
  }
}
