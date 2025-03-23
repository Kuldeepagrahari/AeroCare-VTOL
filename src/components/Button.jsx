"use client"

import "../styles/components/Button.css"

const Button = ({ children, variant = "primary", fullWidth = true, onClick, type = "button", disabled = false }) => {
  return (
    <button
      className={`button ${variant} ${fullWidth ? "full-width" : ""}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button

