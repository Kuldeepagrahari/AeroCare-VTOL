"use client"

import "../styles/VTOLCard.css"

const VTOLCard = ({ vtol, isSelected, onSelect }) => {
  return (
    <div className={`vtol-card ${vtol.status} ${isSelected ? "selected" : ""}`} onClick={onSelect}>
      <div className="vtol-header">
        <h3>{vtol.name}</h3>
        <span className={`status-indicator ${vtol.status}`}>{vtol.status}</span>
      </div>

      <div className="vtol-info">
        <div className="battery-indicator">
          <div className="battery-level" style={{ width: `${vtol.batteryLevel}%` }}></div>
          <span>{vtol.batteryLevel}%</span>
        </div>

        <div className="vtol-details">
          <p>
            <strong>ID:</strong> {vtol.id}
          </p>
          <p>
            <strong>Max Speed:</strong> {vtol.maxSpeed} km/h
          </p>
          <p>
            <strong>Range:</strong> {vtol.range} km
          </p>
        </div>

        <div className="vtol-mission">
          {vtol.currentMission ? (
            <p>
              <strong>Mission:</strong> {vtol.currentMission}
            </p>
          ) : (
            <p className="no-mission">No active mission</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default VTOLCard

