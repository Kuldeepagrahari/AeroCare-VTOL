import { useState } from "react";
import Button from "../../components/Button";
import BottomNavigation from "../../components/BottomNavigation";
import { useNavigate } from "react-router-dom";
const Command = () => {
  const [mode, setMode] = useState("Hover");
  const [temperature, setTemperature] = useState(5.0); // Default 5.0°C
  const navigate = useNavigate()
  const handleEmergencyLanding = async () => {
    try {
      const response = await fetch("/api/emergency-landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "land" }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Emergency landing failed", error);
    }
  };

  const handleModeChange = async (newMode) => {
    setMode(newMode);
    try {
      await fetch("https://vtol-server.onrender.com/api/command/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: newMode }),
      });
    } catch (error) {
      console.error("Mode change failed", error);
    }
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
  const handleRTL = () => {
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div style={{ textAlign: "center", padding: "20px", height:"150vh" }}>
      <h2 style={{ color: "var(--primary-dark)", marginBottom:"20px" }}>Control VTOL</h2>

      {/* Temperature Control Section */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>Temperature Control</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
          {/* Temperature Slider */}
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value).toFixed(1))}
            style={{
              width: "200px",
              cursor: "pointer",
            }}
          />
          {/* Temperature Value */}
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "var(--primary-dark)" }}>
            {temperature}°C
          </div>
        </div>
      </div>

      {/* VTOL Mode Display */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>VTOL Mode</div>
        <strong style={{ fontSize: "24px", color: "var(--primary-dark)" }}>{mode}</strong>
      </div>

      {/* Mode Selection Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {["Takeoff", "Float", "Hover", "AltHold"].map((m) => (
          <button
            key={m}
            style={{
              width: "140px",
              height: "80px",
              backgroundColor: "var(--primary-dark)",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: mode === m ? "5px 10px 10px gray" : "",
            }}
            onClick={() => handleModeChange(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Emergency Landing Button - Centered */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
      <Button variant="primary" fullWidth onClick={handleRTL}>
          Emergency Landing
        </Button>
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <Button variant="primary" fullWidth onClick={handleEmergencyLanding}>
          Landing
        </Button>
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
      <Button variant="primary" fullWidth onClick={EndJourney}>
          End the Journey
        </Button>
      </div>
     
      <BottomNavigation />
    </div>
  );
};

export default Command;
