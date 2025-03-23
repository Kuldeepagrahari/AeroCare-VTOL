import "../styles/components/Logo.css"

const Logo = ({ size = "large", withText = true }) => {
  return (
    <div className={`logo-container ${size}`}>
      <div className="logo-icon">
        {/* Using inline SVG for better control */}
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 180C120 180 140 160 160 120C180 80 160 60 100 40C40 60 20 80 40 120C60 160 80 180 100 180Z"
            fill="#30D5C8"
          />
          <circle cx="100" cy="110" r="40" fill="white" />
          <path d="M100 90V130M80 110H120" stroke="#30D5C8" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
      {withText && (
        <div className="logo-text">
          <h1>AeroCare</h1>
          <p>Swift. Safe. Life-Saving Deliveries</p>
        </div>
      )}
    </div>
  )
}

export default Logo

