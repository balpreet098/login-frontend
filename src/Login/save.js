import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../server/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const submitBtn = useRef(null);

  const [email, setEmail] = useState("bs9988153010@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isUserLogin")) {
      navigate("/Homepage");
    }
  }, [navigate]);
  
  async function loginFormHandler(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", { email, password });
  
      if (response.data.isUserLogin) {
        localStorage.setItem("isUserLogin", true);
        navigate("/Homepage");
      } else {
        alert(response.data.msg);
      }
      console.log(password);
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.msg || "An error occurred during login.");
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (submitBtn.current) {
          submitBtn.current.click();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="main login_container">
      <div className="containesdfgfsdgfdgefgr-background d-flex justify-content-center ">
        <div className="centre mx-auto">
          <div className="page d-flex justify-content-center form-center">
            <div className="login-background p-3 rounded">
              <h1 className="d-flex justify-content-center">LOGIN</h1>
              <form onSubmit={loginFormHandler}>
                <div className="mb-4 input-with-icon">
                  <label htmlFor="email">
                    <strong>EMAIL</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    autoComplete="off"
                    name="email" 
                    value={email} 
                    className="form-control rounded-1 input-field"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                </div>
                <div className="mb-4 input-with-icon">
                  <label htmlFor="password">
                    <strong>PASSWORD</strong>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="ENTER PASSWORD"
                    autoComplete="off"
                    name="password"
                    value={password}
                    className="form-control rounded-1 input-field"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="input-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>

                <div className="remember-forgot">
                  <label htmlFor="remember">
                    <input type="checkbox" />
                    <p>
                      Remember me{" "}
                      <Link to={"/forget-password"}>Forgot password</Link>
                    </p>
                  </label>
                </div>
                <button
                  type="submit"
                  ref={submitBtn}
                  className="button-btn btn-default border w-100 rounded-0 text-decoration-none"
                >
                  <h3>Login</h3>
                </button>
              </form>
              <div className="register-link">
                <p>
                  Don't have any account? <Link to="/Register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
