

// "use client";

// import { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";

// import Button from "../../components/Button";
// import "../../styles/pages/app/LocationSelection.css";
// import BottomNavigation from "../../components/BottomNavigation";
// import { useNavigate } from "react-router-dom";

// const libraries = ["places"];
// const mapContainerStyle = { width: "100%", height: "400px" };
// const defaultCenter = { lat: 64.2008, lng: -149.4937 };

// const polylineOptions = {
//   strokeColor: "#007bff",
//   strokeOpacity: 0.8,
//   strokeWeight: 4,
// };

// const DroneTracking = () => {
//   const navigate = useNavigate()
//   const [droneLocation, setDroneLocation] = useState(defaultCenter);
//   const [dronePath, setDronePath] = useState([]);
//   const [trackingStats, setTrackingStats] = useState({
//     distance: "0m",
//     battery: "100%",
//     temperature: "N/A",
//   });
//   const [navigationPoints, setNavigationPoints] = useState([]);

//   useEffect(() => {
//     const fetchDroneData = async () => {
//       try {
//         const response = await fetch("https://vtol-server.onrender.com/api/telemetry");
//         // const response = ""
//         const data = await response.json();
//         // const data = ""

//         if (response.ok) {
//           const newLocation = { lat: data.latitude, lng: data.longitude };

//           setDroneLocation(newLocation);
//           setDronePath((prevPath) => [...prevPath, newLocation]);

//           setTrackingStats({
//             distance: `${data.distance}m`,
//             battery: `${data.battery}%`,
//             temperature: `${data.temperature}°C`,
//           });

//           setNavigationPoints(data.waypoints || []);
//         } else {
//           console.error("Error fetching drone data:", data.error);
//         }
//       } catch (error) {
//         console.error("Failed to fetch drone data:", error);
//       }
//     };

//     const interval = setInterval(fetchDroneData, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const EndJourney = async() => {
//     try {
//       const response = await fetch(`https://vtol-server.onrender.com/api/telemetry/endJourney`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to end journey");
//       }
//       alert("Hopefully You made a Successful Journey, We will wait for next one!")
//       navigate("/drone/details")
//       return await response.json();
      
//     } catch (error) {
//       console.error("Error ending journey:", error);
//       throw error;
//     }
//   }

//   return (
//     <div className="drone-tracking-page">
//       <h2>Drone Live Tracking</h2>

//       <LoadScript googleMapsApiKey="AIzaSyD3tzc6VU04vYceETM98XM71k1tDGHiC_Q" libraries={libraries}>
//         <GoogleMap mapContainerStyle={mapContainerStyle} center={droneLocation} zoom={15}>
//           <Marker position={droneLocation} label="🚁" />
//           {dronePath.length > 1 && <Polyline path={dronePath} options={polylineOptions} />}
//         </GoogleMap>
//       </LoadScript>

//       {/* Tracking Stats */}
//       <Button variant="primary" style={{margin:"100px"}}fullWidth onClick={EndJourney}>
//             End the Journey
//       </Button>
//       <div className="tracking-stats">
    
//         <div className="stat-item">
//           <div className="stat-value">{trackingStats.distance}</div>
//           <div className="stat-label">Distance</div>
//         </div>

//         <div className="stat-item">
//           <div className="stat-value">{trackingStats.battery}</div>
//           <div className="stat-label">Battery</div>
//         </div>

//         <div className="stat-item">
//           <div className="stat-value">{trackingStats.temperature}</div>
//           <div className="stat-label">Temperature</div>
//         </div>
//       </div>

//       {/* Navigation Details */}
//       <div className="navigation-details">
//         <h2>Navigation</h2>

//         <div className="navigation-points">
//           {navigationPoints.length > 0 ? (
//             navigationPoints.map((point, index) => (
//               <div className="nav-point" key={index}>
//                 <div
//                   className={`point-marker ${
//                     index === 0 ? "start" : index === navigationPoints.length - 1 ? "end" : "waypoint"
//                   }`}
//                 ></div>
//                 <div className="point-details">
//                   <p>{point.address}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No waypoints available</p>
//           )}
//         </div>
//       </div>

//       <BottomNavigation />
//     </div>
//   );
// };

// export default DroneTracking;
import BottomNavigation from '../../components/BottomNavigation';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const DroneTracker = () => {
  const [telemetry, setTelemetry] = useState(null);
  const [position, setPosition] = useState([12.9716, 77.5946]);
  const [path, setPath] = useState([]);
  const [battery, setBattery] = useState(100);
  const [temperature, setTemperature] = useState(25);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const [recentNavigations, setRecentNavigations] = useState([]);
  const [journeyEnded, setJourneyEnded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch('https://vtol-server.onrender.com/api/telemetry');
        const data = await response.json();
        if (data.telemetry && data.telemetry.length > 0) {
          const latestTelemetry = data.telemetry[0];
          const { sourceLatti, sourceLongi, battery, temperature, destiLatti, destiLongi, speed, altitude, timestamp } = latestTelemetry;

          setPosition([sourceLatti, sourceLongi]);
          setPath((prevPath) => [...prevPath, [sourceLatti, sourceLongi]]);
          setBattery(battery);
          setTemperature(temperature);
          setSpeed(speed);
          setAltitude(altitude);
          setTimestamp(timestamp);
          setDistance(calculateDistance(sourceLatti, sourceLongi, destiLatti, destiLongi));
          
          fetchAddress(sourceLatti, sourceLongi).then((address) => {
            setRecentNavigations((prev) => [
              { lat: sourceLatti, lng: sourceLongi, address, speed, altitude, timestamp },
              ...prev.slice(0, 4)
            ]);
          });

          if (battery <= latestTelemetry.criticalBattery) {
            setJourneyEnded(true);
          }
        }
      } catch (error) {
        console.error('Error fetching telemetry data:', error);
      }
    };

    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name || 'Unknown location';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Unknown location';
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const EndJourney = async () => {
    try {
      const response = await fetch("https://vtol-server.onrender.com/api/telemetry/end", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to end journey");

      alert("Hopefully, You made a Successful Journey! We will wait for the next one!");
      sessionStorage.clear();
      navigate("/drone/details");
    } catch (error) {
      console.error("Error ending journey:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' ,height:"150vh"}}>
      <h2>Drone Live Tracking</h2>
      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%', borderRadius: '10px', marginBottom: '20px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={path} color="blue" />
        <Marker position={position} />
      </MapContainer>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', borderRadius: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>Range</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{distance} km</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>Battery</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{battery}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>Temperature</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{temperature} deg</div>
        </div>
      </div>
      
      <div style={{ textAlign: 'left', padding: '10px', background: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h3>Recent Navigations</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {recentNavigations.map((nav, index) => (
            <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #ddd' }}>
              📍 {nav.address} (Speed: {nav.speed} km/h, Altitude: {nav.altitude} m, Time: {nav.timestamp})
            </li>
          ))}
        </ul>
      </div>
      
      <button onClick={EndJourney} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        End Journey
      </button>
      <BottomNavigation />
    </div>
  );
};

export default DroneTracker;

