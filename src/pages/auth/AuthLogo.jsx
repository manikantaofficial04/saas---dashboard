function AuthLogo() {
  return (
    <div className="auth-logo-circle">
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="27.5"
          cy="27.5"
          r="27.5"
          fill="#625BFF"
        />

        <path
          d="M5 26 L20 34 L38 20 L52 27"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="20" cy="34" r="4" fill="white" />
        <circle cx="38" cy="20" r="4" fill="white" />
      </svg>
    </div>
  );
}

export default AuthLogo;