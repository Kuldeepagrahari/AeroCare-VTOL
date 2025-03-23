"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import Input from "../../components/Input"
import Button from "../../components/Button"
import "../../styles/pages/auth/ForgotPassword.css"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError("")
  }

  const validateEmail = () => {
    if (!email) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateEmail()) {
      // Navigate to the popup to select recovery method
      navigate("/forgot-password-popup", { state: { email } })
    }
  }

  return (
    <div className="forgot-password-page">


      <div className="forgot-password-content">
        <Logo size="medium" withText={false} />

        <h1 className="forgot-password-title">Forgot password?</h1>
        <p className="forgot-password-subtitle">
          Enter your email address and we'll send you a confirmation code to reset your password
        </p>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
            error={error}
            required
          />

          <Button type="submit" variant="primary" fullWidth>
            Continue
          </Button>
        </form>

        {/* Virtual keyboard mockup */}
        <div className="virtual-keyboard">{/* This is just a visual representation */}</div>
      </div>
    </div>
  )
}

export default ForgotPassword

