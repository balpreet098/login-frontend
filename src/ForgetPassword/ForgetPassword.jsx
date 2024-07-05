import React, { useState } from "react";
import api from "../server/api";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@gmail\.com$/;
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
        if (response.status === 200) {
          // Assuming 200 is the success status code
          navigate("/verifyOtp", {state:{email}});
        } else {
          setErrorMessage(" THIS EMAIL IS NOT REGISTERED."); 
        }
      } catch (error) {
        setErrorMessage("THIS EMAIL IS NOT REGISTERED");
        console.log(error.message);
      }
    }
  }

  return (
    <>
    <div className="big_container">
      <div className="forget_container">
        <div className="items_container">
          <div className="first_item">
            <h1>Forget Password</h1>
          </div>

          <div className="second_item">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
            />
          </div>
          <br />
          <div className="third_item">
            {errorMessage && (
              <span style={{ color: "red" }}>{errorMessage}</span>
            )}
          </div>
          <br />

          <div className="fourth_item">
            <button className="btn btn-primary" onClick={passwordReset}>
              Submit
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
