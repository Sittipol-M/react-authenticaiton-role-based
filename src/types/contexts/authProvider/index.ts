import { LoginInformation } from "../../pages/signIn"

export interface User {
  username: string
}

export interface AuthContextValue {
  token?: string
  user?: User
  login?: (data: LoginInformation) => Promise<void>
  logout?: () => void
}
