import { Link } from "react-router-dom";
import { ThumbsUp } from "lucide-react";
import "./Confirm.css";

function Confirm() {
  return (
    <div className="confirm-page">

      <div className="confirm-card">

        {/* SUCCESS ILLUSTRATION */}
        <div className="confirm-illustration">

          <div className="confirm-circle">
            <ThumbsUp
              size={52}
              fill="#625BFF"
              color="#625BFF"
              strokeWidth={1.5}
            />
          </div>

          {/* Confetti */}
          <div className="confetti confetti-1"></div>
          <div className="confetti confetti-2"></div>
          <div className="confetti confetti-3"></div>
          <div className="confetti confetti-4"></div>
          <div className="confetti confetti-5"></div>
          <div className="confetti confetti-6"></div>

          <span className="confetti-dot dot-1"></span>
          <span className="confetti-dot dot-2"></span>
          <span className="confetti-dot dot-3"></span>
          <span className="confetti-dot dot-4"></span>

        </div>

        {/* SUCCESS MESSAGE */}
        <h2 className="confirm-message">
          Your account successfully created.
        </h2>

        {/* GO TO HOME */}
        <Link to="/dashboard" className="confirm-home-button">
          Go to Home
        </Link>

      </div>

    </div>
  );
}

export default Confirm;