import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Header.css";

function Header() {
  const [fromDate, setFromDate] = useState("2021-06-10");
  const [toDate, setToDate] = useState("2021-10-10");

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <header className="dashboard-header">
      <div className="header-date-filters">
        <label className="date-picker">
          <span>{formatDate(fromDate)}</span>
          <ChevronDown size={15} />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            aria-label="From date"
          />
        </label>

        <label className="date-picker">
          <span>{formatDate(toDate)}</span>
          <ChevronDown size={15} />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            aria-label="To date"
          />
        </label>
      </div>
    </header>
  );
}

export default Header;