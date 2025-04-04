"use client"

import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import "../../styles/pages/auth/ForgotPasswordPopup.css"

const ForgotPasswordPopup = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || "user@example.com"
  const phone = "+12 8347 2838 28"

  const handleEmailRecovery = () => {
    navigate("/email-verification", { state: { email } })
  }

  const handleWhatsAppRecovery = () => {
    // In a real app, this would send a WhatsApp message
    navigate("/email-verification", { state: { email, isWhatsApp: true } })
  }

  return (
    <div className="forgot-password-popup">
      <div className="popup-overlay">
        <div className="popup-content">
          <h2 className="popup-title">Forgot password?</h2>
          <p className="popup-subtitle">Select which contact details should we use to reset your password</p>

          <div className="recovery-options">
            <div className="recovery-option whatsapp" onClick={handleWhatsAppRecovery}>
              <div className="option-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="option-details">
                <p className="option-label">Send via WhatsApp</p>
                <p className="option-value">{phone}</p>
              </div>
              <div className="option-check">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#30D5C8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>

            <div className="recovery-option email" onClick={handleEmailRecovery}>
              <div className="option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#30D5C8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="option-details">
                <p className="option-label">Send via Email</p>
                <p className="option-value">{email}</p>
              </div>
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={handleEmailRecovery}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPopup

