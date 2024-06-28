import React, { useState } from "react";
import api from "../server/api";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.match(emailRegex)) {
      setErrorMessage("Invalid email format");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  async function passwordReset() {
    if (validateEmail()) {
      try {
        const response = await api.post("/forgot-password", { email });
        if (response.status === 200) { // Assuming 200 is the success status code
          navigate("/verifyOtp?EMAIL="+email);
        } else {
          setErrorMessage("Failed to send reset email.");
        }
      } catch (error) {
        setErrorMessage("Failed to send reset email.");
        console.log(error.message);
      }
    }
  }

  return (
    <>
      <main>
        <h1>Forget Password</h1>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            required
          />
          <br />
          {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
          <br />
          <button className="btn btn-primary" onClick={passwordReset}>
            Submit
          </button>
        </div>
      </main>
    </>
  );
}
