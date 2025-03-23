"use client"

import { useState } from "react"
import "../styles/MissionForm.css"

const MissionForm = ({ vtolCrafts, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: "Medical Supply",
    priority: "medium",
    vtolId: "",
    originName: "",
    originLat: "",
    originLng: "",
    destinationName: "",
    destinationLat: "",
    destinationLng: "",
    scheduledTime: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Format the data for submission
    const missionData = {
      type: formData.type,
      priority: formData.priority,
      vtolId: formData.vtolId,
      origin: {
        name: formData.originName,
        lat: Number.parseFloat(formData.originLat),
        lng: Number.parseFloat(formData.originLng),
      },
      destination: {
        name: formData.destinationName,
        lat: Number.parseFloat(formData.destinationLat),
        lng: Number.parseFloat(formData.destinationLng),
      },
      scheduledTime: formData.scheduledTime,
      status: "scheduled",
    }

    onSubmit(missionData)
  }

  // Filter out VTOLs that are in maintenance
  const availableVTOLs = vtolCrafts.filter((vtol) => vtol.status !== "maintenance")

  return (
    <div className="mission-form-container">
      <h2>Create New Mission</h2>

      <form className="mission-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Mission Details</h3>

          <div className="form-group">
            <label htmlFor="type">Mission Type</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange} required>
              <option value="Medical Supply">Medical Supply</option>
              <option value="Emergency Response">Emergency Response</option>
              <option value="Patient Transport">Patient Transport</option>
              <option value="Equipment Transfer">Equipment Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleChange} required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vtolId">Assign VTOL</label>
            <select id="vtolId" name="vtolId" value={formData.vtolId} onChange={handleChange} required>
              <option value="">Select VTOL</option>
              {availableVTOLs.map((vtol) => (
                <option key={vtol.id} value={vtol.id}>
                  {vtol.name} - {vtol.status} - Battery: {vtol.batteryLevel}%
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="scheduledTime">Scheduled Time</label>
            <input
              type="datetime-local"
              id="scheduledTime"
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Origin</h3>

          <div className="form-group">
            <label htmlFor="originName">Location Name</label>
            <input
              type="text"
              id="originName"
              name="originName"
              value={formData.originName}
              onChange={handleChange}
              placeholder="e.g., SF General Hospital"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="originLat">Latitude</label>
              <input
                type="number"
                id="originLat"
                name="originLat"
                value={formData.originLat}
                onChange={handleChange}
                step="0.000001"
                placeholder="e.g., 37.7749"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="originLng">Longitude</label>
              <input
                type="number"
                id="originLng"
                name="originLng"
                value={formData.originLng}
                onChange={handleChange}
                step="0.000001"
                placeholder="e.g., -122.4194"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Destination</h3>

          <div className="form-group">
            <label htmlFor="destinationName">Location Name</label>
            <input
              type="text"
              id="destinationName"
              name="destinationName"
              value={formData.destinationName}
              onChange={handleChange}
              placeholder="e.g., Berkeley Medical Center"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="destinationLat">Latitude</label>
              <input
                type="number"
                id="destinationLat"
                name="destinationLat"
                value={formData.destinationLat}
                onChange={handleChange}
                step="0.000001"
                placeholder="e.g., 37.8715"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="destinationLng">Longitude</label>
              <input
                type="number"
                id="destinationLng"
                name="destinationLng"
                value={formData.destinationLng}
                onChange={handleChange}
                step="0.000001"
                placeholder="e.g., -122.2730"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Mission
          </button>
        </div>
      </form>
    </div>
  )
}

export default MissionForm

