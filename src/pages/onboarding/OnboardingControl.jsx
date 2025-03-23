"use client"

import { useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import Button from "../../components/Button"
import ProgressDots from "../../components/ProgressDots"
import "../../styles/pages/onboarding/Onboarding.css"

const OnboardingControl = () => {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/onboarding/save")
  }

  return (
    <div className="onboarding-page">
      

      <div className="onboarding-content">
        <Logo size="small" withText={true} />

        <div className="onboarding-illustration">
          <img src="/src/assets/illustrations/control.svg" alt="Easy Control" />
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">Control Made Easy</h1>
          <p className="onboarding-description">
            Schedule, prioritize, and manage all deliveries with just a few taps.
          </p>
        </div>

        <ProgressDots current={3} total={5} />

        <Button variant="primary" fullWidth onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default OnboardingControl

