"use client"

import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../context/AuthContext"

import Logo from "../../components/Logo"
import Button from "../../components/Button"
import ProgressDots from "../../components/ProgressDots"
import "../../styles/pages/onboarding/Onboarding.css"

const OnboardingSave = () => {
  const navigate = useNavigate()
  // const { completeOnboarding } = useAuth()

  const handleGetStarted = () => {
    // completeOnboarding()
    navigate("/drone/details")
  }

  return (
    <div className="onboarding-page">
    

      <div className="onboarding-content">
        <Logo size="small" withText={true} />

        <div className="onboarding-illustration">
          <img src="/src/assets/illustrations/save-lives.svg" alt="Save Lives Together" />
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">Let's Save Lives Together</h1>
          <p className="onboarding-description">Get started and redefine healthcare logistics.</p>
        </div>

        <ProgressDots current={4} total={5} />

        <Button variant="primary" fullWidth onClick={handleGetStarted}>
          Get Started
        </Button>
      </div>
    </div>
  )
}

export default OnboardingSave

