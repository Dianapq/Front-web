import { createContext, useState } from "react"
import api from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password
    })

    const receivedToken = res.data.token

    localStorage.setItem("token", receivedToken)
    setToken(receivedToken)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
