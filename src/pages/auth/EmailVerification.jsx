"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import VerificationInput from "../../components/VerificationInput"
import Button from "../../components/Button"
import Timer from "../../components/Timer"
import "../../styles/pages/auth/EmailVerification.css"

const EmailVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || "user@example.com"
  const maskedEmail = email.replace(/(\w{3})[\w.-]+@([\w.]+)/g, "$1***@$2")

  const [code, setCode] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handleCodeChange = (value) => {
    setCode(value)
    setIsValid(value.length === 4)
  }

  const handleResend = () => {
    // In a real app, this would resend the verification code
    alert("Verification code resent!")
  }

  const handleSubmit = () => {
    if (isValid) {
      // In a real app, this would verify the code
      navigate("/login")
    }
  }

  return (
    <div className="email-verification-page">


      <div className="verification-content">
        <Logo size="medium" withText={false} />

        <h1 className="verification-title">Email verification</h1>
        <p className="verification-subtitle">
          Enter the verification code we sent you on:
          <br />
          <strong>{maskedEmail}</strong>
        </p>

        <div className="verification-code-container">
          <VerificationInput length={4} onChange={handleCodeChange} />
        </div>

        <div className="verification-timer">
          <Timer initialSeconds={60} />
        </div>

        <div className="verification-resend">
          <p>
            Didn't receive code? <button onClick={handleResend}>Resend</button>
          </p>
        </div>

        <Button variant="primary" fullWidth onClick={handleSubmit} disabled={!isValid}>
          Continue
        </Button>
      </div>
    </div>
  )
}

export default EmailVerification

