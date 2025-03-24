"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Autocomplete, Marker, Polyline } from "@react-google-maps/api";
import BottomNavigation from "../../components/BottomNavigation";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "../../styles/pages/app/LocationSelection.css";

const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "250px" };
const defaultCenter = { lat: 64.2008, lng: -149.4937 }; // Default location: Alaska
const polylineOptions = {
  strokeColor: "#007bff",
  strokeOpacity: 0.8,
  strokeWeight: 4,
};

const LocationSelection = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false)
  const [feasibility, setFeasibility] = useState(false);
  const [btnTitle, setBtnTitle] = useState("Check Feasibility");
  const [formData, setFormData] = useState({
    fromLat:"",
    fromLng:"",
    toLat:"",
    toLng:"",
    temperature: "",
    criticalBattery:"",
    date: "",
    time: "",
    fromLocation:"",
    toLocation:""
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [fromAutocomplete, setFromAutocomplete] = useState(null);
  const [toAutocomplete, setToAutocomplete] = useState(null);

  const handlePlaceSelect = (autocomplete, field) => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setFormData((prev) => ({
          ...prev,
          [field]: place.formatted_address,
        }));

        setFormData((prev) => ({
          ...prev,
          [field === "toLocation" ? "toLat" : "fromLat"]: lat,
          [field === "toLocation" ? "toLng" : "fromLng"]: lng,
        }));

        // Update the map center when selecting the 'To' location
        setMapCenter({ lat, lng });

        console.log(`Updated ${field} Coords: Lat = ${lat}, Lng = ${lng}`);
      }
    }
  };

  const CheckFeasibility = async () => {
    if (!formData.fromLat || !formData.fromLng || !formData.toLat || !formData.toLng) {
      alert("Please select valid locations.");
      return;
    }

    try {
      const response = await fetch("https://vtol-server.onrender.com/api/telemetry/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceLongi: formData.fromLng,
          sourceLatti: formData.fromLat,
          destiLongi: formData.toLng,
          destiLatti: formData.toLat
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeasibility(true);
        setBtnTitle("Go Ahead");
      } else {
        alert(`We can't cover this much distance + Error: ${data.error}\nBattery: ${data.batterySoC}%\nDistance: ${data.distance.toFixed(2)} km`);
      }
    } catch (error) {
      console.error("Feasibility Check Failed:", error);
      alert("Failed to check feasibility. Please try again.");
    }
  };

  //book
  const handleBook = async() => {
  
    try {
      const response = await fetch("https://vtol-server.onrender.com/api/telemetry/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceLongi:formData.fromLng,
          sourceLatti:formData.fromLat,
          destiLongi:formData.toLng,
          destiLatti:formData.toLat,
          criticalBattery:formData.criticalBattery,
          temperature:formData.temperature
        }),
      });

      const data = await response.json();
      

      if (response.ok) {
        navigate("/booking/confirmed")
      } else {
        alert("start jouney API Error");
      }
    } catch (error) {
      console.error("Start Journey Failed", error);
      alert("Server Issue");
    }
  }

  const handleNext = () => {
    setShowDetails(true)
    
  };

  return (
    <div className="location-selection-page">
      <div className="location-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="location-title">Syma W2</h1>
        <button className="menu-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyD3tzc6VU04vYceETM98XM71k1tDGHiC_Q" libraries={libraries}>
        <div className="map-container">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={10}>
            {/* Markers for Start & End Locations */}
            {formData.fromLat && formData.fromLng && (
              <Marker position={{ lat: formData.fromLat, lng: formData.fromLng }} label="A" />
            )}
            {formData.toLat && formData.toLng && (
              <Marker position={{ lat: formData.toLat, lng: formData.toLng }} label="B" />
            )}

            {/* Draw Path Between Locations */}
            {formData.fromLat && formData.fromLng && formData.toLat && formData.toLng && (
              <Polyline
                path={[
                  { lat: formData.fromLat, lng: formData.fromLng },
                  { lat: formData.toLat, lng: formData.toLng },
                ]}
                options={polylineOptions}
              />
            )}
          </GoogleMap>
        </div>

        <div className="location-form">
          <h2>Location</h2>

          <div className="location-inputs">
            <div className="location-input-group">
              <Autocomplete
                onLoad={(auto) => setFromAutocomplete(auto)}
                onPlaceChanged={() => handlePlaceSelect(fromAutocomplete, "fromLocation")}
              >
                <Input
                  placeholder="From where?"
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
                />
              </Autocomplete>
            </div>

            <div className="location-input-group">
              <Autocomplete
                onLoad={(auto) => setToAutocomplete(auto)}
                onPlaceChanged={() => handlePlaceSelect(toAutocomplete, "toLocation")}
              >
                <Input
                  placeholder="Where should you go?"
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={(e) => setFormData({ ...formData, toLocation: e.target.value })}
                />
              </Autocomplete>
            </div>
            <div className="location-input-group">
             
                <Input
                  placeholder="Critical Battery?"
                  name="critical"
                  value={formData.criticalBattery}
                  onChange={(e) => setFormData({ ...formData, criticalBattery: e.target.value })}
                />
             
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={CheckFeasibility}>
            {btnTitle}
          </Button>

          {feasibility && (
            <>
              <div className="temperature-section">
                <h2>Temperature</h2>
                <Input
                  placeholder="Temp"
                  name="temperature"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                />
              </div>

              <div className="datetime-section">
                <h2>Date & Time</h2>
                <div className="datetime-inputs">
                  <div className="date-input">
                    <div className="input-icon calendar"></div>
                    <Input
                      placeholder="Today Apr, 30"
                      name="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="time-input">
                    <div className="input-icon clock"></div>
                    <Input
                      placeholder="12:30 pm"
                      name="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button variant="primary" fullWidth onClick={handleNext}>
                Proceed
              </Button>
            </>
          )}
        </div>
        {showDetails ? <>
        <div className="order-details-container">
        <h2>Order Details</h2>

        <div className="order-locations">
          <div className="location-item">
            <div className="location-dot blue"></div>
            <div className="location-details">
              <p className="location-name">{formData.fromLocation}</p>
            </div>
          </div>

          <div className="location-item">
            <div className="location-dot orange"></div>
            <div className="location-details">
              <p className="location-name">{formData.toLocation} </p>
            </div>
          </div>
        </div>

        <div className="order-time">
          <div className="time-label">Time</div>
          <div className="time-value">{formData.time}</div>
          <div className="date-value">{formData.date}</div>
        </div>
        <div className="order-time">
          <div className="time-label">Temperature Required</div>
          <div className="time-value">{formData.temperature} deg</div>
        </div>

        <Button variant="primary" fullWidth onClick={handleBook}>
          Book
        </Button>
      </div> </> : <></>}
      </LoadScript>
      <BottomNavigation />
    </div>
  );
};

export default LocationSelection;
