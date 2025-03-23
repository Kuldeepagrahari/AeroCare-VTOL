
import BottomNavigation from "../../components/BottomNavigation"
import "../../styles/pages/app/DroneTracking.css"

const DroneTracking = () => {
  return (
    <div className="drone-tracking-page">


      <div className="tracking-header">
        <div className="app-logo">
          <h1>AeroCare</h1>
        </div>
        <div className="header-actions">
          <button className="notification-button">
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button className="profile-button">
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>

      <div className="map-container">
        <div className="map">
          {/* Google Maps would be integrated here */}
          <div className="map-placeholder">
            <div className="route-marker origin"></div>
            <div className="route-path"></div>
            <div className="route-marker destination"></div>
            <div className="drone-marker active"></div>
            <div className="route-marker waypoint"></div>
          </div>
        </div>
      </div>

      <div className="tracking-stats">
        <div className="stat-item">
          <div className="stat-value">150m</div>
          <div className="stat-label">Distance</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">%90</div>
          <div className="stat-label">Battery</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">41°</div>
          <div className="stat-label">Temperature</div>
        </div>
      </div>

      <div className="navigation-details">
        <h2>Navigation</h2>

        <div className="navigation-points">
          <div className="nav-point">
            <div className="point-marker start"></div>
            <div className="point-details">
              <p>Sun Street, 19 New York</p>
            </div>
          </div>

          <div className="nav-point">
            <div className="point-marker waypoint"></div>
            <div className="point-details">
              <p>Central Park, New York</p>
            </div>
          </div>

          <div className="nav-point">
            <div className="point-marker end"></div>
            <div className="point-details">
              <p>Leaf Street, 12 New York</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}

export default DroneTracking

