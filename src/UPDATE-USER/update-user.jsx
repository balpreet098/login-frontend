import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./update-user.css";

export default function Updateuser() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const emailParam = location.state?.email;
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.state]);

  async function newpassword(e) {
    try {
      e.preventDefault();
      const response = await axios.put('http://localhost:4000/updateuser', {
        email,
        newPassword
      });
      console.log(response);
      console.log(response.data.msg);
      console.log("Password reset successfully");
      setShowPopup(true);
    } catch (error) {
      console.error(error.response?.data?.msg || 'An error occurred');
    }
  }

  return (
    <>
      <div className="verify-otp-container">
        <div className="form-container">
          <h1 className="form-title">Reset Password</h1>
          <form onSubmit={newpassword}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit">Submit</button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Password Reset Successfully!</h2>
            <button onClick={() => setShowPopup(false)} className="btn-close">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
