"use client"

import { createContext, useState, useContext } from "react"

// Create the context
const VTOLContext = createContext()

// Dummy data for VTOL crafts
const dummyVTOLData = [
  {
    id: "vtol-001",
    name: "AeroCare Alpha",
    status: "active",
    batteryLevel: 87,
    location: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    currentMission: "Medical supply delivery",
    maxSpeed: 240, // km/h
    range: 300, // km
  },
  {
    id: "vtol-002",
    name: "AeroCare Beta",
    status: "maintenance",
    batteryLevel: 42,
    location: { lat: 37.3382, lng: -121.8863 }, // San Jose
    currentMission: null,
    maxSpeed: 220, // km/h
    range: 280, // km
  },
  {
    id: "vtol-003",
    name: "AeroCare Gamma",
    status: "active",
    batteryLevel: 93,
    location: { lat: 37.8715, lng: -122.273 }, // Berkeley
    currentMission: "Emergency response",
    maxSpeed: 260, // km/h
    range: 320, // km
  },
  {
    id: "vtol-004",
    name: "AeroCare Delta",
    status: "standby",
    batteryLevel: 100,
    location: { lat: 37.4419, lng: -122.143 }, // Palo Alto
    currentMission: null,
    maxSpeed: 250, // km/h
    range: 310, // km
  },
]

// Dummy data for missions
const dummyMissionData = [
  {
    id: "mission-001",
    type: "Medical Supply",
    status: "in-progress",
    vtolId: "vtol-001",
    origin: { lat: 37.7749, lng: -122.4194, name: "SF General Hospital" },
    destination: { lat: 37.8715, lng: -122.273, name: "Berkeley Medical Center" },
    priority: "high",
    estimatedArrival: "2023-09-15T14:30:00",
  },
  {
    id: "mission-002",
    type: "Emergency Response",
    status: "in-progress",
    vtolId: "vtol-003",
    origin: { lat: 37.8715, lng: -122.273, name: "Berkeley Medical Center" },
    destination: { lat: 37.9, lng: -122.3, name: "Richmond Emergency Site" },
    priority: "critical",
    estimatedArrival: "2023-09-15T13:15:00",
  },
  {
    id: "mission-003",
    type: "Medical Supply",
    status: "scheduled",
    vtolId: "vtol-004",
    origin: { lat: 37.4419, lng: -122.143, name: "Palo Alto Medical" },
    destination: { lat: 37.5, lng: -122.2, name: "Redwood City Hospital" },
    priority: "medium",
    estimatedArrival: "2023-09-15T16:00:00",
  },
]

// Provider component
export const VTOLProvider = ({ children }) => {
  const [vtolCrafts, setVtolCrafts] = useState(dummyVTOLData)
  const [missions, setMissions] = useState(dummyMissionData)
  const [selectedVTOL, setSelectedVTOL] = useState(null)
  const [selectedMission, setSelectedMission] = useState(null)

  // Dummy API functions
  const getVTOLCrafts = () => vtolCrafts

  const getVTOLById = (id) => {
    return vtolCrafts.find((vtol) => vtol.id === id) || null
  }

  const getMissions = () => missions

  const getMissionById = (id) => {
    return missions.find((mission) => mission.id === id) || null
  }

  const updateVTOLLocation = (id, newLocation) => {
    setVtolCrafts((prevCrafts) =>
      prevCrafts.map((craft) => (craft.id === id ? { ...craft, location: newLocation } : craft)),
    )
  }

  const assignMission = (vtolId, missionId) => {
    // Logic to assign a mission to a VTOL craft
    console.log(`Assigning mission ${missionId} to VTOL ${vtolId}`)
  }

  const value = {
    vtolCrafts,
    missions,
    selectedVTOL,
    selectedMission,
    setSelectedVTOL,
    setSelectedMission,
    getVTOLCrafts,
    getVTOLById,
    getMissions,
    getMissionById,
    updateVTOLLocation,
    assignMission,
  }

  return <VTOLContext.Provider value={value}>{children}</VTOLContext.Provider>
}

// Custom hook to use the VTOL context
export const useVTOL = () => {
  const context = useContext(VTOLContext)
  if (context === undefined) {
    throw new Error("useVTOL must be used within a VTOLProvider")
  }
  return context
}

