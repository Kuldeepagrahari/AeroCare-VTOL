"use client"

import { useEffect, useRef, useState } from "react"
import "../styles/VTOLMap.css"

const VTOLMap = ({ vtolCrafts, missions }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [missionPaths, setMissionPaths] = useState([])

  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsAPI = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`
      script.async = true
      script.defer = true
      window.initMap = () => {
        if (mapRef.current) {
          const newMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.7749, lng: -122.4194 }, // San Francisco as default center
            zoom: 10,
            styles: [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }],
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
            ],
          })
          setMap(newMap)
        }
      }
      document.head.appendChild(script)
    }

    // Check if Google Maps API is already loaded
    if (!window.google) {
      loadGoogleMapsAPI()
    } else {
      // If already loaded, initialize map
      window.initMap()
    }

    // Cleanup
    return () => {
      window.initMap = undefined
    }
  }, [])

  // Create markers for VTOL crafts
  useEffect(() => {
    if (!map || !vtolCrafts.length) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    // Create new markers
    const newMarkers = vtolCrafts.map((vtol) => {
      const marker = new window.google.maps.Marker({
        position: vtol.location,
        map: map,
        title: vtol.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: vtol.status === "active" ? "#4CAF50" : vtol.status === "maintenance" ? "#FF9800" : "#2196F3",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#FFFFFF",
        },
      })

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="info-window">
            <h3>${vtol.name}</h3>
            <p>Status: ${vtol.status}</p>
            <p>Battery: ${vtol.batteryLevel}%</p>
            ${vtol.currentMission ? `<p>Mission: ${vtol.currentMission}</p>` : ""}
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      return marker
    })

    setMarkers(newMarkers)
  }, [map, vtolCrafts])

  // Create paths for active missions
  useEffect(() => {
    if (!map || !missions.length) return

    // Clear existing paths
    missionPaths.forEach((path) => path.setMap(null))

    // Create new paths for in-progress missions
    const activeMissions = missions.filter((mission) => mission.status === "in-progress")

    const newPaths = activeMissions.map((mission) => {
      const path = new window.google.maps.Polyline({
        path: [mission.origin, mission.destination],
        geodesic: true,
        strokeColor: mission.priority === "critical" ? "#FF0000" : mission.priority === "high" ? "#FF9800" : "#4CAF50",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        icons: [
          {
            icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
            offset: "50%",
            repeat: "100px",
          },
        ],
      })

      path.setMap(map)
      return path
    })

    setMissionPaths(newPaths)
  }, [map, missions])

  return (
    <div className="vtol-map">
      <div ref={mapRef} className="map-container"></div>
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-marker active"></span>
          <span>Active</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker maintenance"></span>
          <span>Maintenance</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker standby"></span>
          <span>Standby</span>
        </div>
      </div>
    </div>
  )
}

export default VTOLMap

