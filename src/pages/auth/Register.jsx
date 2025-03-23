"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import Input from "../../components/Input"
import Button from "../../components/Button"
import SocialLogin from "../../components/SocialLogin"
import "../../styles/pages/auth/Register.css"

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [termsAccepted, setTermsAccepted] = useState(false)

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

    if (!formData.name) {
      newErrors.name = "Name is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!termsAccepted) {
      newErrors.terms = "You must accept the Terms of Service"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Navigate to onboarding
      navigate("/onboarding/welcome")
    }
  }

  return (
    <div className="register-page">
      <div className="register-content">
        <Logo size="small" withText={false} />

        <h1 className="register-title">Create your new account</h1>
        <p className="register-subtitle">Create an account to start booking for the food you like</p>

        <form className="register-form" onSubmit={handleSubmit}>
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
            label="User Name"
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
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

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms">
              I Agree with <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
            {errors.terms && <div className="checkbox-error">{errors.terms}</div>}
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Register
          </Button>
        </form>

        <div className="register-divider">
          <span>Or sign in with</span>
        </div>

        <SocialLogin />

        <div className="register-login">
          <p>
            Don't have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

