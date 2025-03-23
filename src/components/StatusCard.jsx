import "../styles/StatusCard.css"

const StatusCard = ({ title, value, color }) => {
  return (
    <div className={`status-card ${color}`}>
      <h3 className="card-title">{title}</h3>
      <div className="card-value">{value}</div>
    </div>
  )
}

export default StatusCard

