"use client"

import { useNavigate } from "react-router-dom"

import Button from "../../components/Button"
import "../../styles/pages/app/OrderDetails.css"

const OrderDetails = () => {
  const navigate = useNavigate()

  const handleBook = () => {
    navigate("/booking/confirmed")
  }

  return (
    <div className="order-details-page">


      <div className="order-header">
        <button className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="order-title">Syma W2</h1>
        <button className="menu-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>

      <div className="map-container">
        <div className="map">
          {/* Google Maps would be integrated here */}
          <div className="map-placeholder">
            <div className="route-marker origin"></div>
            <div className="route-path"></div>
            <div className="route-marker destination"></div>
            <div className="drone-marker"></div>
          </div>
        </div>
      </div>

      <div className="order-details-container">
        <h2>Order Details</h2>

        <div className="order-locations">
          <div className="location-item">
            <div className="location-dot blue"></div>
            <div className="location-details">
              <p className="location-name">Sand Houses 1234 Street No: 12</p>
            </div>
          </div>

          <div className="location-item">
            <div className="location-dot orange"></div>
            <div className="location-details">
              <p className="location-name">Sun Houses 4321 Street No:9</p>
            </div>
          </div>
        </div>

        <div className="order-time">
          <div className="time-label">Time</div>
          <div className="time-value">12:30 pm</div>
          <div className="date-value">Today Apr, 30</div>
        </div>

        <Button variant="primary" fullWidth onClick={handleBook}>
          Book
        </Button>
      </div>
    </div>
  )
}

export default OrderDetails

