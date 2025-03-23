"use client"

import { useNavigate } from "react-router-dom"

import Logo from "../../components/Logo"
import Button from "../../components/Button"
import ProgressDots from "../../components/ProgressDots"
import "../../styles/pages/onboarding/Onboarding.css"

const OnboardingEssentials = () => {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/onboarding/track")
  }

  return (
    <div className="onboarding-page">
     

      <div className="onboarding-content">
        <Logo size="small" withText={true} />

        <div className="onboarding-illustration">
          <img src="/src/assets/illustrations/medical-delivery.svg" alt="Medical Delivery" />
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">Deliver Life-Saving Essentials</h1>
          <p className="onboarding-description">
            From organs to vaccines, ensure critical supplies reach their destination on time.
          </p>
        </div>

        <ProgressDots current={1} total={5} />

        <Button variant="primary" fullWidth onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default OnboardingEssentials

