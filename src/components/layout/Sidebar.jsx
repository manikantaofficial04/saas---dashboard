import {
  LayoutDashboard,
  ChartNoAxesColumn,
  PanelsTopLeft,
  CalendarClock,
  CalendarDays,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import baseLogo from "../../assets/base-logo.png";
import profilePhoto from "../../assets/profile.png";

import "./Sidebar.css";

const menuItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: ChartNoAxesColumn,
  },
  {
    path: "/invoice",
    label: "Invoice",
    icon: PanelsTopLeft,
  },
  {
    path: "/schedule",
    label: "Schedule",
    icon: CalendarClock,
  },
  {
    path: "/calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    path: "/messages",
    label: "Messages",
    icon: MessageSquare,
    notification: "49",
  },
  {
    path: "/notification",
    label: "Notification",
    icon: Bell,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  // Open Login page when profile is clicked
  const handleProfileClick = () => {
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-brand">
        <img
          src={baseLogo}
          alt="Stackly Logo"
          className="brand-logo"
        />
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} strokeWidth={2.3} />

              <span className="sidebar-label">
                {item.label}
              </span>

              {item.notification && (
                <span className="sidebar-notification">
                  {item.notification}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* UPGRADE CARD */}
      <div className="sidebar-upgrade">

        <div className="upgrade-illustration">
          <div className="upgrade-cone"></div>
        </div>

        <button
          className="upgrade-button"
          onClick={() => navigate("/settings")}
        >
          Upgrade
        </button>

      </div>

      {/* PROFILE SECTION */}
      <div className="sidebar-bottom">

        <div
          className="sidebar-profile-clickable"
          onClick={handleProfileClick}
          role="button"
          tabIndex={0}
          title="Open Login"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleProfileClick();
            }
          }}
        >
          <img
            src={profilePhoto}
            alt="Profile"
            className="sidebar-profile-photo"
          />

          <div className="sidebar-profile-info">
            <span className="profile-name">
              Easin Arafat
            </span>

            <span className="profile-role">
              Free Account
            </span>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          className="sidebar-logout"
          aria-label="Logout"
          title="Logout"
          onClick={() => navigate("/login")}
        >
          <LogOut size={14} />
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;