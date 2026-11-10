import { useState } from "react";
import { Link } from "react-router-dom";
import { Network } from "lucide-react";
import "./Recover.css";

function Recover() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRecover = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setError("");

    // Demo only: no password-reset email is sent.
    setSuccess(true);
  };

  return (
    <div className="recover-page">
      <div className="recover-card">

        <div className="recover-logo">
          <div className="recover-logo-circle">
            <Network size={35} strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="recover-title">Recover</h2>

        {success ? (
          <div className="recover-success">
            <p>
              If an account exists with this email, password
              recovery instructions can be sent.
            </p>

            <Link to="/login" className="recover-button">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRecover}>

            <div className="recover-form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <p className="recover-error">{error}</p>
            )}

            <button type="submit" className="recover-button">
              Reset Your Password
            </button>

          </form>
        )}

      </div>
    </div>
  );
}

export default Recover;