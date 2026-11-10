import {
  Heart,
  Package,
  ShoppingBag,
  BriefcaseBusiness,
} from "lucide-react";

import "./StatsCards.css";

const stats = [
  {
    id: 1,
    value: "178+",
    label: "Save Products",
    icon: Heart,
    color: "#5790ff",
    background: "#edf3ff",
  },
  {
    id: 2,
    value: "20+",
    label: "Stock Products",
    icon: Package,
    color: "#ffbd24",
    background: "#fff6df",
  },
  {
    id: 3,
    value: "190+",
    label: "Sales Products",
    icon: ShoppingBag,
    color: "#ff896d",
    background: "#fff0ed",
  },
  {
    id: 4,
    value: "12+",
    label: "Job Application",
    icon: BriefcaseBusiness,
    color: "#655bff",
    background: "#f0efff",
  },
];

function StatsCards() {
  return (
    <div className="stats-container">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div className="stat-card" key={item.id}>
            <div
              className="stat-icon"
              style={{ backgroundColor: item.background }}
            >
              <Icon
                size={21}
                color={item.color}
                fill={item.id === 1 ? item.color : "none"}
                strokeWidth={2.5}
              />
            </div>

            <div className="stat-information">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;