import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../server/api";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.search]);

  async function Updateuser() {
    try {
      await api.post("http://localhost:4000/verify-otp", { otp, email });
      console.log("OTP verified successfully");
    } catch (error) {
      console.log("Failed to verify OTP");
    }
  }





  

  return (
    <>
      <main>
        <h1>VERIFY OTP</h1>
        <div>
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={Updateuser}>
            Submit
          </button>
        </div>
      </main>
    </>
  );
}
