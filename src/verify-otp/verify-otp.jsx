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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    // Regex for password validation: at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.
    return  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
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
      setPasswordError("Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter,  one number,  and one special character.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await api.post(
        `http://localhost:4000/verify-otp?otp=${otp}&email=${email}`,
        { email, otp, newPassword },
        navigate("/login")

      );

      console.log(response);
      console.log(response.data.msg);
    } catch (error) {
      console.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <>
      <div className="verify-otp-container">
        <div className="3-container-item">
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
              {otpError && <span style={{color:"red"}} className="error-msg">{otpError}</span>}
              {/* {errorMessage?.email && (<span style={{ color: "red" }}>{errorMessage?.email}</span>)} */}

            </div>

            <div className="second">
              <input
                            className="input_class"

                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {emailError && <p className="error-msg">{emailError}</p>} */}
              {emailError && <span style={{color:"red"}} className="error-msg">{emailError}</span>}

            </div>

            <div className="second">
              <input
                            className="input_class"

                type="password"
                placeholder="Enter your Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {/* {passwordError && <p className="error-msg">{passwordError}</p>} */}
              {passwordError && <span style={{color:"red"}} className="error-msg">{passwordError}</span>}

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






























// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../server/api";
// import "./verify_otp.css";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword]=useState("")
//   const location = useLocation();

//   const navigate = useNavigate();



//   useEffect(() => {
//     const emailParam = location.state?.email; // Access the passed data
//     if (emailParam) {
//       setEmail(emailParam);
//     }


//   }, [location.state]);

//   async function Updateuser(e) {
//     try {
//       e.preventDefault();

//       const response = await api.post(
//         `http://localhost:4000/verify-otp?otp=${otp}&email=${email}`,
//         { email, otp, newPassword }
//       );


//       console.log(response);

//       console.log(response.data.msg);
//     } catch (error) {
//       console.error(error.response?.data?.msg || "An error occurred");
//     }

//   }
//   // console.log(email);

  
//   return (
//     <>
//       <div className="verify-otp-container">
//         <div className="3-container-item">
//           <div className="verify-first">
//             <h1>VERIFY OTP</h1>
//           </div>

//           <form onSubmit={Updateuser}>
//             <div className="second">
//               <input
//                 type="text"
//                 placeholder="Enter your OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />


//               <input
//                 type="text"
//                 placeholder="EMAIL"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />


//             </div>{" "}
//             <div className="second">
//               <input
//                 type="text"
//                 placeholder="NEW PASSWORD"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>
//             <div className="third">
//               <button type="submit" className="btn btn-secondary">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
