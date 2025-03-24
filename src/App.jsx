import { Routes, Route } from "react-router-dom"

// Auth Pages
import SplashScreen from "./pages/auth/SplashScreen"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ForgotPasswordPopup from "./pages/auth/ForgotPasswordPopup"
import EmailVerification from "./pages/auth/EmailVerification"

// Onboarding Pages
import OnboardingWelcome from "./pages/onboarding/OnboardingWelcome"
import OnboardingEssentials from "./pages/onboarding/OnboardingEssentials"
import OnboardingTrack from "./pages/onboarding/OnboardingTrack"
import OnboardingControl from "./pages/onboarding/OnboardingControl"
import OnboardingSave from "./pages/onboarding/OnboardingSave"

// Main App Pages
import DroneDetails from "./pages/app/DroneDetails"
import LocationSelection from "./pages/app/LocationSelection"
import OrderDetails from "./pages/app/OrderDetails"
import BookingConfirmed from "./pages/app/BookingConfirmed"
import DroneTracking from "./pages/app/DroneTracking"
import Profile from "./pages/Profile"
import Command from "./pages/app/Command"

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password-popup" element={<ForgotPasswordPopup />} />
      <Route path="/email-verification" element={<EmailVerification />} />

      {/* Onboarding Routes */}
      <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
      <Route path="/onboarding/essentials" element={<OnboardingEssentials />} />
      <Route path="/onboarding/track" element={<OnboardingTrack />} />
      <Route path="/onboarding/control" element={<OnboardingControl />} />
      <Route path="/onboarding/save" element={<OnboardingSave />} />

      {/* App Routes */}
      <Route path="/drone/details" element={<DroneDetails />} />
      <Route path="/location" element={<LocationSelection />} />
      <Route path="/order/details" element={<OrderDetails />} />
      <Route path="/booking/confirmed" element={<BookingConfirmed />} />
      <Route path="/tracking" element={<DroneTracking />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/command" element={<Command />} />
       
    </Routes>
  )
}

export default App

