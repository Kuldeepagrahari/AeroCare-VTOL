import "../styles/components/DroneStats.css"

const DroneStats = ({ battery, speed, range, wind }) => {
  return (
    <div className="drone-stats">
      <div className="stat-item">
        <div className="stat-icon">
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
            <path d="M7 7h10v10H7z"></path>
            <path d="M7 3v4h10V3"></path>
            <path d="M7 21v-4h10v4"></path>
          </svg>
        </div>
        <div className="stat-label">Battery</div>
        <div className="stat-value">{battery}%</div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
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
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <div className="stat-label">Speed</div>
        <div className="stat-value">
          {speed}
          <span className="stat-unit">km/h</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
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
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
        </div>
        <div className="stat-label">Range</div>
        <div className="stat-value">
          {range}
          <span className="stat-unit">km</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
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
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
          </svg>
        </div>
        <div className="stat-label">Wind</div>
        <div className="stat-value">
          {wind}
          <span className="stat-unit">km/h</span>
        </div>
      </div>
    </div>
  )
}

export default DroneStats

