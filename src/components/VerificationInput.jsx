"use client"

import { useRef, useState, useEffect } from "react"
import "../styles/components/VerificationInput.css"

const VerificationInput = ({ length = 4, onChange }) => {
  const [code, setCode] = useState(Array(length).fill(""))
  const inputs = useRef([])

  useEffect(() => {
    // Focus the first input on mount
    if (inputs.current[0]) {
      inputs.current[0].focus()
    }
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value

    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    // Update the code array
    const newCode = [...code]
    newCode[index] = value.slice(-1) // Only take the last character
    setCode(newCode)

    // Call the onChange callback with the complete code
    if (onChange) {
      onChange(newCode.join(""))
    }

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length)

    if (!/^\d+$/.test(pastedData)) return

    const newCode = [...code]

    for (let i = 0; i < pastedData.length; i++) {
      if (i < length) {
        newCode[i] = pastedData[i]
      }
    }

    setCode(newCode)

    // Focus the input after the last pasted character
    const focusIndex = Math.min(pastedData.length, length - 1)
    inputs.current[focusIndex].focus()

    if (onChange) {
      onChange(newCode.join(""))
    }
  }

  return (
    <div className="verification-input">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="verification-digit"
        />
      ))}
    </div>
  )
}

export default VerificationInput

