import "../styles/components/ProgressDots.css"

const ProgressDots = ({ current, total }) => {
  return (
    <div className="progress-dots">
      {[...Array(total)].map((_, index) => (
        <div key={index} className={`dot ${index === current ? "active" : ""}`}></div>
      ))}
    </div>
  )
}

export default ProgressDots

