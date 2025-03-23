import "../styles/VTOLDetailPanel.css"

const VTOLDetailPanel = ({ vtol }) => {
  return (
    <div className="vtol-detail-panel">
      <h2>{vtol.name} Details</h2>

      <div className="detail-section">
        <h3>General Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">ID:</span>
            <span className="detail-value">{vtol.id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-${vtol.status}`}>{vtol.status}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Battery:</span>
            <div className="battery-bar">
              <div
                className={`battery-fill ${vtol.batteryLevel < 20 ? "low" : vtol.batteryLevel < 50 ? "medium" : "high"}`}
                style={{ width: `${vtol.batteryLevel}%` }}
              ></div>
              <span>{vtol.batteryLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Performance Specifications</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Max Speed:</span>
            <span className="detail-value">{vtol.maxSpeed} km/h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Range:</span>
            <span className="detail-value">{vtol.range} km</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Current Location</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Latitude:</span>
            <span className="detail-value">{vtol.location.lat.toFixed(6)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Longitude:</span>
            <span className="detail-value">{vtol.location.lng.toFixed(6)}</span>
          </div>
        </div>
        <div className="location-map">
          <div className="map-placeholder">
            <p>Location Map</p>
            <small>
              Lat: {vtol.location.lat.toFixed(6)}, Lng: {vtol.location.lng.toFixed(6)}
            </small>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Mission Status</h3>
        {vtol.currentMission ? (
          <div className="mission-info">
            <p className="mission-name">{vtol.currentMission}</p>
          </div>
        ) : (
          <div className="no-mission-info">
            <p>No active mission</p>
            <button className="assign-mission-btn">Assign New Mission</button>
          </div>
        )}
      </div>

      <div className="detail-actions">
        <button className="action-btn maintenance-btn">Schedule Maintenance</button>
        <button className="action-btn recall-btn">Recall VTOL</button>
      </div>
    </div>
  )
}

export default VTOLDetailPanel

