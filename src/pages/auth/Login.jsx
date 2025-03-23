"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import Input from "../../components/Input"
import Button from "../../components/Button"
import SocialLogin from "../../components/SocialLogin"
import "../../styles/pages/auth/Login.css"

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      navigate("/onboarding/welcome")
    }
  }

  return (
    <div className="login-page">


      <div className="login-content">
        <Logo size="medium" withText={false} />

        <h1 className="login-title">Welcome!</h1>
        <p className="login-subtitle">Hello, please sign in to continue!</p>
        <p className="login-create-account">
          Or <Link to="/register">Create new account</Link>
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            showPasswordToggle
          />

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>
        </form>

        <SocialLogin />

        <div className="login-register">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

