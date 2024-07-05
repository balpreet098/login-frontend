import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../server/api";
import "./verify_otp.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false); // State for success message
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const emailParam = location.state?.email;
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.state]);

  const validateOtp = (otp) => {
    // Regex for OTP: 6 digits exactly
    return /^\d{6}$/.test(otp);
  };

  const validateEmail = (email) => {
    // Regex for email validation
    return /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@gmail\.com$/.test(email);
  };

  const validatePassword = (password) => {
    // Regex for password validation: at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    let isOtpValid = validateOtp(otp);
    let isEmailValid = validateEmail(email);
    let isPasswordValid = validatePassword(newPassword);

    if (!isOtpValid) {
      setOtpError("Enter a valid OTP (6 digits)");
      return;
    } else {
      setOtpError("");
    }

    if (!isEmailValid) {
      setEmailError("Enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    if (!isPasswordValid) {
      setPasswordError(
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await api.post(`/verify-otp?otp=${otp}&email=${email}`,

  
      );

      console.log(response);
      console.log(response.data.msg);

      // Show success message
      setResetSuccess(true);

      // Navigate to login page after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Navigate after 3 seconds

    } catch (error) {
      console.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <>
      <div className="verify-otp-container">
        <div className="container-item">
          <div className="verify-first">
            <h1>RESET PASSWORD</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="second">
              <input
                className="input_class"
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpError && <span className="error-msg">{otpError}</span>}
            </div>

            <div className="second">
              <input
                className="input_class"
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <span className="error-msg">{emailError}</span>}
            </div>

            <div className="second">
              <input
                className="input_class"
                type="password"
                placeholder="Enter your Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {passwordError && (
                <span className="error-msg">{passwordError}</span>
              )}
            </div>

            <div className="third">
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </div>
          </form>

          {/* Success message */}
          {resetSuccess && (
            <div className="success-message">
              Password reset successfully!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
