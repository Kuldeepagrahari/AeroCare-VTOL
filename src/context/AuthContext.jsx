"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("aerocare_user")
    const firstTimeCheck = localStorage.getItem("aerocare_first_time")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (firstTimeCheck === "false") {
      setIsFirstTime(false)
    }

    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("aerocare_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aerocare_user")
  }

  const register = (userData) => {
    setUser(userData)
    localStorage.setItem("aerocare_user", JSON.stringify(userData))
  }

  const completeOnboarding = () => {
    setIsFirstTime(false)
    localStorage.setItem("aerocare_first_time", "false")
  }

  const value = {
    user,
    isFirstTime,
    loading,
    login,
    logout,
    register,
    completeOnboarding,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

