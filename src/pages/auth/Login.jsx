import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLogo from "./AuthLogo.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");

    // Frontend demo login
    navigate("/dashboard");
  };

  return (
    <div className="auth-login-page">
      <div className="auth-login-card">

        {/* LEFT LOGIN PANEL */}
        <section className="auth-login-form-panel">
          <div className="auth-login-content">

            {/* CUSTOM LOGO */}
            <div className="auth-logo">
              <AuthLogo />
            </div>

            <h2 className="auth-login-title">
              Log in
            </h2>

            {/* SOCIAL LOGIN */}
            <div className="auth-social-buttons">
              <button type="button">
                <span className="google-icon">G</span>
                Google
              </button>

              <button type="button">
                <span className="facebook-icon">f</span>
                Facebook
              </button>
            </div>

            {/* DIVIDER */}
            <div className="auth-divider">
              <span></span>
              <p>Or</p>
              <span></span>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="auth-form-group">
                <label>Email Address</label>

                <div className="auth-input-wrapper">
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="auth-form-group">
                <label>Password</label>

                <div className="auth-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME AND RESET PASSWORD */}
              <div className="auth-login-options">

                <label className="auth-remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(e.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>

                <Link
                  to="/recover"
                  className="auth-reset-link"
                >
                  Reset Password?
                </Link>

              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="auth-error">
                  {error}
                </p>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="auth-submit-button"
              >
                Log in
              </button>

            </form>

            {/* SIGN UP NAVIGATION */}
            <div className="auth-signup-text">
              Don't have account yet?

              <Link to="/signup">
                New Account
              </Link>
            </div>

          </div>
        </section>

        {/* RIGHT ILLUSTRATION PANEL */}
        <section className="auth-login-illustration">

          <svg
            viewBox="0 0 650 550"
            className="auth-workspace-svg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Person working at a desk"
          >

            {/* BACKGROUND */}
            <ellipse
              cx="325"
              cy="455"
              rx="230"
              ry="18"
              fill="#EEEDFF"
            />

            <path
              d="M110 300 C80 200 175 140 270 190 C350 235 410 125 510 180 C610 235 570 370 520 420 L120 420 Z"
              fill="#EEEDFF"
            />

            {/* CLOCK */}
            <circle
              cx="295"
              cy="95"
              r="39"
              fill="white"
              stroke="#FF4B32"
              strokeWidth="7"
            />

            <path
              d="M281 90 L293 102 L312 77"
              fill="none"
              stroke="#333344"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* DESK */}
            <path
              d="M180 290 L180 440 M490 290 L490 440"
              stroke="#FF8A6C"
              strokeWidth="9"
            />

            <rect
              x="150"
              y="285"
              width="370"
              height="12"
              rx="3"
              fill="#FF906C"
            />

            {/* COMPUTER */}
            <path
              d="M245 220 L355 220 L385 285 L270 285 Z"
              fill="#21BEDB"
            />

            <circle
              cx="310"
              cy="255"
              r="5"
              fill="white"
            />

            <path
              d="M310 285 L310 300"
              stroke="#42445A"
              strokeWidth="5"
            />

            {/* CPU */}
            <rect
              x="105"
              y="365"
              width="105"
              height="95"
              rx="4"
              fill="#20BDD8"
            />

            <rect
              x="112"
              y="372"
              width="91"
              height="80"
              fill="none"
              stroke="#149CB7"
              strokeWidth="3"
            />

            {/* CHAIR */}
            <path
              d="M390 250 L480 250 L465 350 L380 350 Z"
              fill="#FFD66D"
            />

            <path
              d="M420 350 L420 440"
              stroke="#FFD66D"
              strokeWidth="10"
            />

            <path
              d="M385 440 L455 440"
              stroke="#FFD66D"
              strokeWidth="9"
            />

            {/* HAIR */}
            <path
              d="M340 145 C325 105 370 75 405 95 C440 85 455 125 430 155 Z"
              fill="#080A32"
            />

            {/* FACE */}
            <path
              d="M365 125 C365 100 415 100 422 130 L420 175 C410 205 375 195 365 170 Z"
              fill="#FFAA8D"
            />

            {/* NECK */}
            <path
              d="M380 178 L380 207 L405 210 L405 180"
              fill="#FFAA8D"
            />

            {/* EYES */}
            <circle cx="385" cy="142" r="3" fill="#22233B" />
            <circle cx="408" cy="142" r="3" fill="#22233B" />

            {/* BODY */}
            <path
              d="M365 190 C330 185 320 225 315 285 L425 285 L435 225 C425 190 405 185 365 190 Z"
              fill="#625BFF"
            />

            <path
              d="M380 205 L380 275 M380 225 L420 230"
              stroke="#AAA6FF"
              strokeWidth="2"
            />

            {/* LEFT ARM */}
            <path
              d="M335 215 L310 270 L345 285"
              stroke="#625BFF"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />

            {/* RIGHT ARM */}
            <path
              d="M425 215 L440 265 L395 280"
              stroke="#625BFF"
              strokeWidth="19"
              strokeLinecap="round"
              fill="none"
            />

            {/* HANDS */}
            <circle cx="345" cy="283" r="10" fill="#FFAA8D" />
            <circle cx="395" cy="280" r="10" fill="#FFAA8D" />

            {/* LEGS */}
            <path
              d="M350 280 L320 390 L285 440"
              stroke="#080A32"
              strokeWidth="33"
              strokeLinecap="round"
              fill="none"
            />

            <path
              d="M405 280 L395 390 L365 440"
              stroke="#080A32"
              strokeWidth="34"
              strokeLinecap="round"
              fill="none"
            />

            {/* SHOES */}
            <path
              d="M280 430 L310 440 L295 465 L260 455 Z"
              fill="#D72CFF"
            />

            <path
              d="M360 430 L390 435 L385 465 L350 460 Z"
              fill="#D72CFF"
            />

            {/* PLANT */}
            <path
              d="M555 355 L555 415"
              stroke="#8EBD56"
              strokeWidth="5"
            />

            <path
              d="M555 370 C510 345 520 320 535 320 C555 325 555 350 555 370"
              fill="#389C54"
            />

            <path
              d="M555 355 C575 315 605 325 595 345 C585 355 570 360 555 355"
              fill="#389C54"
            />

            <path
              d="M555 395 C530 375 510 390 535 400"
              fill="#389C54"
            />

            <path
              d="M535 410 L575 410 L568 450 L542 450 Z"
              fill="#FFD66D"
            />

            {/* PENCIL HOLDER */}
            <rect
              x="465"
              y="250"
              width="32"
              height="34"
              rx="3"
              fill="#E83B25"
            />

            <path
              d="M470 250 L470 220 M480 250 L480 215 M490 250 L490 225"
              strokeWidth="5"
              strokeLinecap="round"
              stroke="#FFB13B"
            />

          </svg>

        </section>

      </div>
    </div>
  );
}

export default Login;