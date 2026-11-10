import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLogo from "./AuthLogo.jsx";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  // SIGNUP FUNCTION
  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !email.trim() ||
      !username.trim() ||
      !password.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (!agreed) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    setError("");

    // Navigate to confirmation page
    navigate("/confirm");
  };

  return (
    <div className="auth-signup-page">

      <div className="auth-signup-card">

        {/* LEFT SIGNUP PANEL */}
        <section className="auth-signup-form-panel">

          <div className="auth-signup-content">

            {/* SHARED LOGO */}
            <div className="auth-logo">
              <AuthLogo />
            </div>

            <h2 className="auth-signup-title">
              Sign Up
            </h2>

            {/* SOCIAL BUTTONS */}
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

            {/* SIGNUP FORM */}
            <form onSubmit={handleSignup}>

              {/* FULL NAME */}
              <div className="auth-form-group">

                <label>Full Name</label>

                <div className="auth-input-wrapper">

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    autoComplete="name"
                  />

                </div>

              </div>

              {/* EMAIL ADDRESS */}
              <div className="auth-form-group">

                <label>Email Address</label>

                <div className="auth-input-wrapper">

                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                  />

                </div>

              </div>

              {/* USERNAME */}
              <div className="auth-form-group">

                <label>Username</label>

                <div className="auth-input-wrapper">

                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    autoComplete="username"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="auth-form-group">

                <label>Password</label>

                <div className="auth-input-wrapper">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="new-password"
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

              {/* TERMS AND PRIVACY */}
              <label className="auth-signup-terms">

                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) =>
                    setAgreed(e.target.checked)
                  }
                />

                <span>
                  By creating an account you agree to the{" "}
                  <a href="#terms">terms of use</a> and our{" "}
                  <a href="#privacy">privacy policy</a>.
                </span>

              </label>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="auth-error">
                  {error}
                </p>
              )}

              {/* CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                className="auth-submit-button"
              >
                Create account
              </button>

            </form>

            {/* LOGIN NAVIGATION */}
            <div className="auth-signup-text">

              Already have an account?

              <Link to="/login">
                Log in
              </Link>

            </div>

          </div>

        </section>

        {/* RIGHT ILLUSTRATION PANEL */}
        <section className="auth-signup-illustration">

          <svg
            viewBox="0 0 700 550"
            className="auth-signup-svg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Person working at a desk"
          >

            {/* BACKGROUND */}
            <ellipse
              cx="350"
              cy="470"
              rx="260"
              ry="16"
              fill="#EEEDFF"
            />

            <path
              d="M100 320 C65 200 180 120 285 190 C400 260 460 110 570 185 C660 250 610 390 560 430 L110 430 Z"
              fill="#EEEDFF"
            />

            {/* LEFT DRAWER */}
            <rect
              x="105"
              y="315"
              width="95"
              height="145"
              fill="#FF9E13"
            />

            <rect
              x="112"
              y="325"
              width="81"
              height="25"
              fill="#FBB42C"
            />

            <rect
              x="112"
              y="360"
              width="81"
              height="25"
              fill="#FBB42C"
            />

            <rect
              x="112"
              y="395"
              width="81"
              height="25"
              fill="#FBB42C"
            />

            {/* LAMP */}
            <path
              d="M115 220 L165 220 L180 270 L100 270 Z"
              fill="#1670FF"
            />

            <path
              d="M140 270 L140 315"
              stroke="#1670FF"
              strokeWidth="7"
            />

            <path
              d="M115 315 L165 315"
              stroke="#1670FF"
              strokeWidth="7"
            />

            {/* BOOKS */}
            <rect
              x="170"
              y="280"
              width="45"
              height="8"
              rx="3"
              fill="#FF7043"
            />

            <rect
              x="165"
              y="290"
              width="55"
              height="8"
              rx="3"
              fill="#31B7DB"
            />

            <rect
              x="175"
              y="300"
              width="40"
              height="8"
              rx="3"
              fill="#F5B62B"
            />

            {/* LEFT PLANT */}
            <rect
              x="245"
              y="275"
              width="38"
              height="35"
              rx="7"
              fill="#FFB21B"
            />

            <path
              d="M264 275 L264 235"
              stroke="#429B56"
              strokeWidth="5"
            />

            <path
              d="M264 255 C230 240 245 215 264 240"
              fill="#429B56"
            />

            <path
              d="M264 260 C300 235 285 215 264 245"
              fill="#429B56"
            />

            <path
              d="M264 245 C250 215 270 205 264 245"
              fill="#429B56"
            />

            {/* DESK */}
            <path
              d="M220 305 L570 305 L550 320 L240 320 Z"
              fill="#625BFF"
            />

            <path
              d="M250 320 L225 465"
              stroke="#625BFF"
              strokeWidth="10"
            />

            <path
              d="M540 320 L570 465"
              stroke="#625BFF"
              strokeWidth="10"
            />

            <path
              d="M300 400 L525 400"
              stroke="#625BFF"
              strokeWidth="7"
            />

            {/* LAPTOP */}
            <path
              d="M300 235 L390 235 L410 305 L320 305 Z"
              fill="#E82DDB"
            />

            <circle
              cx="350"
              cy="270"
              r="8"
              fill="#FFE16A"
            />

            {/* CHAIR */}
            <path
              d="M430 320 L515 320 L500 400 L425 400 Z"
              fill="#FFDA65"
            />

            <path
              d="M455 400 L450 465"
              stroke="#FFDA65"
              strokeWidth="8"
            />

            <path
              d="M500 400 L515 465"
              stroke="#FFDA65"
              strokeWidth="8"
            />

            {/* HAIR */}
            <path
              d="M420 180 C405 145 430 115 460 125 C490 105 520 140 500 175 Z"
              fill="#080A32"
            />

            {/* FACE */}
            <path
              d="M430 155 C430 130 480 125 490 160 L485 205 C475 225 445 220 435 200 Z"
              fill="#FFAA8D"
            />

            {/* BODY */}
            <path
              d="M425 210 C390 205 385 260 375 305 L485 305 L495 250 C490 215 455 205 425 210 Z"
              fill="#625BFF"
            />

            <path
              d="M445 220 L445 295 M465 225 L480 270"
              stroke="#AAA6FF"
              strokeWidth="2"
            />

            {/* LEFT ARM */}
            <path
              d="M400 230 L375 290 L410 300"
              stroke="#625BFF"
              strokeWidth="19"
              strokeLinecap="round"
              fill="none"
            />

            {/* RIGHT ARM */}
            <path
              d="M480 230 L510 285 L470 300"
              stroke="#625BFF"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />

            {/* HANDS */}
            <circle
              cx="410"
              cy="300"
              r="9"
              fill="#FFAA8D"
            />

            <circle
              cx="470"
              cy="300"
              r="9"
              fill="#FFAA8D"
            />

            {/* LEGS */}
            <path
              d="M420 305 L390 400 L355 450"
              stroke="#17132E"
              strokeWidth="28"
              strokeLinecap="round"
              fill="none"
            />

            <path
              d="M470 305 L460 405 L485 450"
              stroke="#17132E"
              strokeWidth="29"
              strokeLinecap="round"
              fill="none"
            />

            {/* SHOES */}
            <path
              d="M350 445 L390 445 L380 465 L340 460 Z"
              fill="#DA2BFF"
            />

            <path
              d="M475 445 L505 445 L510 465 L470 460 Z"
              fill="#DA2BFF"
            />

            {/* RIGHT PLANT */}
            <path
              d="M600 365 L600 430"
              stroke="#469B55"
              strokeWidth="5"
            />

            <path
              d="M600 390 C560 350 555 320 575 330 C600 340 600 390 600 390"
              fill="#399A53"
            />

            <path
              d="M600 370 C625 325 655 335 640 355 C630 370 600 370 600 370"
              fill="#399A53"
            />

            <path
              d="M600 410 C570 385 555 395 585 415"
              fill="#399A53"
            />

            <path
              d="M570 425 L630 425 L620 465 L580 465 Z"
              fill="#FFB62D"
            />

            {/* PENCIL HOLDER */}
            <rect
              x="510"
              y="275"
              width="30"
              height="30"
              fill="#E9442C"
            />

            <path
              d="M515 275 L515 240 M525 275 L525 235 M535 275 L535 245"
              stroke="#FFB52C"
              strokeWidth="5"
            />

          </svg>

        </section>

      </div>
    </div>
  );
}

export default Signup;