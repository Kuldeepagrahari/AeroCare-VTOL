

// import BottomNavigation from '../../components/BottomNavigation';
// import React, { useState, useEffect } from 'react';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
// import { useNavigate } from 'react-router-dom';

// const DroneTracker = () => {
//   const [telemetry, setTelemetry] = useState(null);
//   const [position, setPosition] = useState([12.9716, 77.5946]);
//   const [destination, setDestination] = useState([12.9721, 77.5950]); // Default destination
//   const [path, setPath] = useState([]);

//   const [battery, setBattery] = useState(90);
//   const [HSpeed, setHSpeed] = useState(0)
//   const [VSpeed, setVSpeed] = useState(0)

//   const [altitude, setAltitude] = useState(0)
//   const [temperature, setTemperature] = useState(8);
//   const [distance, setDistance] = useState(0);
//   const [timestamp, setTimestamp] = useState('');
//   const [recentNavigations, setRecentNavigations] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTelemetry = async () => {
//       try {
//         const response = await fetch('https://vtol-server.onrender.com/api/telemetry');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         const configurations = data.configurations
//         const latestTelemetry = data.latestTelemetry
       
//         const {horizontalSpeed, verticalSpeed, battery, currLatti, currLongi, currAltitude} = latestTelemetry;
//         const {sourceLatti, sourceLongi, destiLatti, destiLongi, temperature} = configurations
//         // verticalSpeed = verticalSpeed.toFixed(2)
//         // horizontalSpeed = horizontalSpeed.toFixed(2)
//         setBattery(battery)
//         setHSpeed(horizontalSpeed)
//         setVSpeed(verticalSpeed)
//         setAltitude(currAltitude)
//         setPosition([sourceLatti, sourceLongi]);
//         setDestination([destiLatti, destiLongi]);
//         setPath((prevPath) => [...prevPath, [sourceLatti, sourceLongi]]);
//         setTemperature(temperature);
//         setTimestamp(timestamp);
//         setDistance(calculateDistance(currLatti === 0 ? sourceLatti : currLatti, currLongi === 0 ? sourceLongi : currLongi, destiLatti, destiLongi));

//         fetchAddress(sourceLatti, sourceLongi).then((address) => {
//           setRecentNavigations((prev) => [
//             { lat: currLatti === 0 ? sourceLatti : currLatti, lng: currLongi === 0 ? sourceLongi : currLongi, address, timestamp },
//             ...prev.slice(0, 4)
//           ]);
//         });

//       } catch (error) {
//         console.error('Error fetching telemetry data:', error);
//       }
//     };

//     const interval = setInterval(fetchTelemetry, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchAddress = async (lat, lng) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       return data.display_name || 'Unknown location';
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       return 'Unknown location';
//     }
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = (value) => (value * Math.PI) / 180;
//     const R = 6371;
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return (R * c).toFixed(2);
//   };

//   const RecenterMap = ({ position }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(position, map.getZoom());
//     }, [position, map]);
//     return null;
//   };

//   return (
//     <div style={{ padding: '10px', fontFamily: 'Arial, sans-serif', textAlign: 'center', height: "250vh" }}>
//       <h2 style={{color:"var(--primary-dark)"}}>Drone Live Tracking</h2>
//       <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%', borderRadius: '10px', marginBottom: '20px' }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Polyline positions={[position, destination]} color="blue" />
//         <Marker key={`${position[0]}-${position[1]}`} position={position} />
//         <Marker key={`${destination[0]}-${destination[1]}`} position={destination} />
//         <RecenterMap position={position} />
//       </MapContainer>
      
//       <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', borderRadius: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
//         <div style={{ textAlign: 'center' }}>
//           <span style={{ fontWeight: 'bold', color: '#555' }}>Range</span>
//           <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{distance} km</div>
//         </div>
//         <div style={{ textAlign: 'center' }}>
//           <span style={{ fontWeight: 'bold', color: '#555' }}>Battery</span>
//           <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{battery}%</div>
//         </div>
//         <div style={{ textAlign: 'center' }}>
//           <span style={{ fontWeight: 'bold', color: '#555' }}>Temperature</span>
//           <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{temperature}°C</div>
//         </div>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', borderRadius: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
//         <div style={{ textAlign: 'center' }}>
//           <span style={{ fontWeight: 'bold', color: '#555' }}>Altitude</span>
//           <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{altitude} m</div>
//         </div>
//         <div style={{ textAlign: 'center' }}>
//           <span style={{ fontWeight: 'bold', color: '#555' }}>horizontal Speed</span>
//           <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{HSpeed.toFixed(2)} m/s</div>
//         </div>
       
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', borderRadius: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
//       <div style={{ textAlign: 'center' }}>
//           <span style={{ fontWeight: 'bold', color: '#555' }}>Vertical Speed</span>
//           <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{VSpeed.toFixed(2)} m/s</div>
//         </div>
       
//       </div>
      
//       <div style={{ textAlign: 'left', padding: '10px', background: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
//         <h3>Recent Navigations</h3>
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           {recentNavigations.map((nav, index) => (
//             <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #ddd' }}>
//               📍 {nav.address} (Time: {nav.timestamp})
//             </li>
//           ))}
//         </ul>
//       </div>

//       <BottomNavigation />
//     </div>
//   );
// };

// export default DroneTracker;
import BottomNavigation from '../../components/BottomNavigation';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';  // Import Leaflet for custom marker
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

// Import the drone image
import droneIconImage from '../../assets/drone-icon.png'; // Ensure you have a drone image in your assets folder

const DroneTracker = () => {
  const [position, setPosition] = useState([12.9716, 77.5946]);
  const [destination, setDestination] = useState([12.9721, 77.5950]);
  const [path, setPath] = useState([]);
  const [battery, setBattery] = useState(91);
  const [HSpeed, setHSpeed] = useState(0);
  const [VSpeed, setVSpeed] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [temperature, setTemperature] = useState(8);
  const [distance, setDistance] = useState(0);
  const [recentNavigations, setRecentNavigations] = useState([]);
  const navigate = useNavigate();
  var f = 0
  // Custom Drone Icon
  const droneIcon = L.icon({
    iconUrl: droneIconImage, // Drone icon image path
    iconSize: [50, 50], // Size of the icon [width, height]
    iconAnchor: [25, 25], // Center the icon on the coordinates
    popupAnchor: [0, -25], // Position of popup
  });

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch('https://vtol-server.onrender.com/api/telemetry');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const configurations = data.configurations;
        const latestTelemetry = data.latestTelemetry;

        const { horizontalSpeed, verticalSpeed, battery, currLatti, currLongi, currAltitude } = latestTelemetry;
        const { sourceLatti, sourceLongi, destiLatti, destiLongi, temperature, criticalBattery } = configurations;

        setBattery(battery);
        setHSpeed(horizontalSpeed);
        setVSpeed(verticalSpeed);
        setAltitude(currAltitude);
        setTemperature(temperature);
        setDestination([destiLatti, destiLongi]);

        const newPosition = currLatti && currLongi ? [currLatti, currLongi] : [sourceLatti, sourceLongi];
        setPosition(newPosition);
        setPath((prevPath) => [...prevPath, newPosition]);
        let dist = calculateDistance(newPosition[0], newPosition[1], destiLatti, destiLongi)
        setDistance(dist);
        console.log("dis" + battery + " crit" + criticalBattery)
        if(f === 0 && dist * 1000 !== 0 && battery < criticalBattery){
          alert("Fail Safe Triggered !")
          f = 1
          return
        }

      } catch (error) {
        console.error('Error fetching telemetry data:', error);
      }
    };

    const interval = setInterval(fetchTelemetry, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom());
    }, [position, map]);
    return null;
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial, sans-serif', textAlign: 'center', height: "250vh" }}>
      <h2 style={{ color: "var(--primary-dark)" }}>Drone Live Tracking</h2>
      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%', borderRadius: '10px', marginBottom: '20px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={path} color="blue" />
        
        {/* Drone Marker with Custom Icon */}
        <Marker key={`${position[0]}-${position[1]}`} position={position} icon={droneIcon} />

        {/* Destination Marker */}
        <Marker key={`${destination[0]}-${destination[1]}`} position={destination} />

        <RecenterMap position={position} />
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
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{temperature}°C</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', borderRadius: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>Altitude</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{altitude} m</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>Horizontal Speed</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{HSpeed.toFixed(2)} m/s</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', borderRadius: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>Vertical Speed</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{VSpeed.toFixed(2)} m/s</div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default DroneTracker;
