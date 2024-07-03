import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../server/api";
import "./update-user.css";

export default function Updateuser() {
  // const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword]=useState("")
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {

    const emailParam = location.state?.email; // Access the passed data
    if (emailParam) {
       setEmail(emailParam);
    }



  }, [location.state]);


  // async function updatePassword(email, newPassword) {
  //   try {
  //     const response = await axios.put('http://localhost:4000/updateuser', {
  //       email,
  //       newPassword
  //     });
  
  //     console.log(response.data.msg);
  //   } catch (error) {
  //     console.error(error.response?.data?.msg || 'An error occurred');
  //   }
  // }
  

  async function newpassword(e) {
    try {
      e.preventDefault();
  
      const response = await axios.put('http://localhost:4000/updateuser', {
        email,
        newPassword
      });
      console.log(response);
      console.log(response.data.msg);
      console.log("OTP verified successfully");
    } catch (error) {
      console.error(error.response?.data?.msg || 'An error occurred');
    }
  }
  // console.log(email);

  return (
    <>
      <div className="verify-otp-container">
        <div className="3-container-item">
          <div className="verify-first">
            <h1>RESET-PASSWORD</h1>
          </div>

          <form onSubmit={newpassword} >
            <div className="second">
              <input
                type="text"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>   <div className="second">
              <input
                type="text"
                placeholder="NEW PASSWORD"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="third">
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
