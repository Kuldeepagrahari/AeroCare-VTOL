import "../styles/MissionCard.css"

const MissionCard = ({ mission, vtolName }) => {
  // Format the estimated arrival time
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`mission-card priority-${mission.priority} status-${mission.status}`}>
      <div className="mission-header">
        <div className="mission-type">{mission.type}</div>
        <div className="mission-priority">{mission.priority}</div>
      </div>

      <div className="mission-body">
        <div className="mission-route">
          <div className="origin">
            <strong>From:</strong> {mission.origin.name}
          </div>
          <div className="route-arrow">→</div>
          <div className="destination">
            <strong>To:</strong> {mission.destination.name}
          </div>
        </div>

        <div className="mission-details">
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-${mission.status}`}>{mission.status.replace("-", " ")}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">VTOL:</span>
            <span className="detail-value">{vtolName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">ETA:</span>
            <span className="detail-value">{formatTime(mission.estimatedArrival)}</span>
          </div>
        </div>
      </div>

      <div className="mission-actions">
        <button className="action-btn view-btn">View Details</button>
        {mission.status === "scheduled" && <button className="action-btn start-btn">Start Mission</button>}
        {mission.status === "in-progress" && <button className="action-btn complete-btn">Complete</button>}
      </div>
    </div>
  )
}

export default MissionCard

