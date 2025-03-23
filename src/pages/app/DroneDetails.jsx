"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../../components/Button"
import DroneStats from "../../components/DroneStats"
import BottomNavigation from "../../components/BottomNavigation"
import "../../styles/pages/app/DroneDetails.css"

const DroneDetails = () => {
  const navigate = useNavigate()
  const [drone] = useState({
    id: "Syma W2",
    name: "Protective Drone",
    description: "Scratch your protective drone-infested plant house fruit and vegetable pesticides",
    model: "Aviator Pro",
    battery: 98,
    speed: 59.9,
    range: 3001,
    wind: 15,
  })

  const handleScheduleRide = () => {
    navigate("/location")
  }

  return (
    <div className="drone-details-page">


      <div className="drone-details-header">
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
        <h1 className="drone-name">{drone.id}</h1>
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

      <div className="drone-details-content">
        <div className="drone-title">
          <h2>{drone.name}</h2>
          <p>{drone.description}</p>
        </div>

        <div className="drone-image">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 20C80 20 60 40 40 80C20 120 40 140 100 160C160 140 180 120 160 80C140 40 120 20 100 20Z"
              stroke="#30D5C8"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M40 60L20 40M160 60L180 40M40 100L10 100M160 100L190 100M60 140L40 160M140 140L160 160"
              stroke="#30D5C8"
              strokeWidth="4"
            />
            <rect x="70" y="70" width="60" height="60" stroke="#30D5C8" strokeWidth="4" fill="none" />
          </svg>
          <div className="drone-model">{drone.model}</div>
        </div>

        <div className="drone-battery">
          <div className="battery-label">Battery</div>
          <div className="battery-bar">
            <div className="battery-level" style={{ width: `${drone.battery}%` }}></div>
            <div className="battery-percentage">{drone.battery}%</div>
          </div>
        </div>

        <DroneStats battery={drone.battery} speed={drone.speed} range={drone.range} wind={drone.wind} />

        <Button variant="primary" fullWidth onClick={handleScheduleRide}>
          Schedule a Ride
        </Button>
      </div>

      <BottomNavigation />
    </div>
  )
}

export default DroneDetails

