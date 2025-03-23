"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../../components/Logo"
import "../../styles/pages/auth/SplashScreen.css"

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-navigate after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-screen">
      <Logo size="large" withText={true} />
      <p className="tagline">Swift. Safe. Life-Saving Deliveries</p>
    </div>
  )
}

export default SplashScreen

