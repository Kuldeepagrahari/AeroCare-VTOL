"use client"

import { useNavigate } from "react-router-dom"

import Button from "../../components/Button"
import "../../styles/pages/app/BookingConfirmed.css"

const BookingConfirmed = () => {
  const navigate = useNavigate()

  const handleTrack = () => {
    navigate("/tracking")
  }

  return (
    <div className="booking-confirmed-page">
      

      <div className="confirmation-content">
        <div className="confirmation-animation">
          <div className="checkmark-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#30D5C8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="animation-elements">
            <div className="element e1"></div>
            <div className="element e2"></div>
            <div className="element e3"></div>
            <div className="element e4"></div>
            <div className="element e5"></div>
            <div className="element e6"></div>
          </div>
        </div>

        <h1 className="confirmation-title">Booking Confirmed</h1>
        <p className="confirmation-message">Our drone is ready to save lives!</p>

        <Button variant="primary" fullWidth onClick={handleTrack}>
          Track
        </Button>
      </div>
    </div>
  )
}

export default BookingConfirmed

