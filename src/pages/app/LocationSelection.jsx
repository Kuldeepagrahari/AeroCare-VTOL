"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../../components/Button"
import Input from "../../components/Input"
import "../../styles/pages/app/LocationSelection.css"

const LocationSelection = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    temperature: "",
    date: "",
    time: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    navigate("/order/details")
  }

  return (
    <div className="location-selection-page">


      <div className="location-header">
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
        <h1 className="location-title">Syma W2</h1>
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
            <p>Roll City, 4848 St, Alaska</p>
          </div>
        </div>
      </div>

      <div className="location-form">
        <h2>Location</h2>

        <div className="location-inputs">
          <div className="location-input-group">
            <div className="input-icon from"></div>
            <Input
              placeholder="From where?"
              name="fromLocation"
              value={formData.fromLocation}
              onChange={handleChange}
            />
          </div>

          <div className="location-input-group">
            <div className="input-icon to"></div>
            <Input
              placeholder="Where should you go?"
              name="toLocation"
              value={formData.toLocation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="temperature-section">
          <h2>Temperature</h2>
          <Input placeholder="Temp" name="temperature" value={formData.temperature} onChange={handleChange} />
        </div>

        <div className="datetime-section">
          <h2>Data & Time</h2>
          <div className="datetime-inputs">
            <div className="date-input">
              <div className="input-icon calendar"></div>
              <Input placeholder="Today Apr, 30" name="date" value={formData.date} onChange={handleChange} />
            </div>

            <div className="time-input">
              <div className="input-icon clock"></div>
              <Input placeholder="12:30 pm" name="time" value={formData.time} onChange={handleChange} />
            </div>
          </div>
        </div>

        <Button variant="primary" fullWidth onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default LocationSelection

