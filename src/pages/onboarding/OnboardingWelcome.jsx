"use client"

import { useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import Button from "../../components/Button"
import ProgressDots from "../../components/ProgressDots"
import "../../styles/pages/onboarding/Onboarding.css"

const OnboardingWelcome = () => {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/onboarding/essentials")
  }

  return (
    <div className="onboarding-page">
   

      <div className="onboarding-content">
        <Logo size="medium" withText={false} />

        <div className="onboarding-illustration">
          <img src="/src/assets/icons/drone-icon.svg" alt="AeroCare Drone" className="drone-icon" />
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">Welcome to AeroCare!</h1>
          <p className="onboarding-description">
            Revolutionizing medical deliveries with drones. Faster, safer, and smarter healthcare logistics.
          </p>
        </div>

        <ProgressDots current={0} total={5} />

        <Button variant="primary" fullWidth onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default OnboardingWelcome

