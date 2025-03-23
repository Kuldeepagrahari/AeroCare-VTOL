"use client"

import { useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import Button from "../../components/Button"
import ProgressDots from "../../components/ProgressDots"
import "../../styles/pages/onboarding/Onboarding.css"

const OnboardingTrack = () => {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/onboarding/control")
  }

  const handleAllowLocation = () => {
    // In a real app, this would request location permissions
    navigate("/onboarding/control")
  }

  const handleSkip = () => {
    navigate("/onboarding/control")
  }

  return (
    <div className="onboarding-page">
   

      <div className="onboarding-content">
        <Logo size="small" withText={true} />

        <div className="onboarding-illustration">
          <img src="/src/assets/illustrations/tracking.svg" alt="Drone Tracking" />
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">Track Your Drones Live</h1>
          <p className="onboarding-description">
            Monitor drone routes, payload status, and ETAs with precision. For Real Time Tracking turn on live location.
          </p>
        </div>

        <ProgressDots current={2} total={5} />

        <div className="onboarding-buttons">
          <Button variant="primary" fullWidth onClick={handleAllowLocation}>
            Allow live location
          </Button>

          <Button variant="secondary" fullWidth onClick={handleSkip}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingTrack

