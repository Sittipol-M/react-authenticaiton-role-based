import { User } from "../../types/contexts/authProvider"
import CryptoJs from "crypto-js"

export const encryptUser = (user: User) => {
  const encryptData = CryptoJs.AES.encrypt(
    JSON.stringify(user),
    import.meta.env.VITE_USER_ENCRYPT_KEY as string
  )
  return encryptData.toString()
}
