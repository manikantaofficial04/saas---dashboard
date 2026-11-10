import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  ShoppingBag,
  MessageCircle,
  CalendarDays,
  CreditCard,
  UserPlus,
  AlertCircle,
  Check,
  MoreHorizontal,
} from "lucide-react";

import "./Notification.css";

const initialNotifications = [
  {
    id: 1,
    title: "New Order Received",
    description:
      "You received a new order #ORD-8765 from Olivia Martinez.",
    time: "5 minutes ago",
    category: "Orders",
    icon: ShoppingBag,
    color: "purple",
    unread: true,
  },
  {
    id: 2,
    title: "New Message",
    description:
      "Sophia Williams sent you a message regarding the dashboard design.",
    time: "20 minutes ago",
    category: "Messages",
    icon: MessageCircle,
    color: "blue",
    unread: true,
  },
  {
    id: 3,
    title: "Upcoming Meeting",
    description:
      "Your project meeting with the design team starts at 2:00 PM.",
    time: "1 hour ago",
    category: "Schedule",
    icon: CalendarDays,
    color: "orange",
    unread: true,
  },
  {
    id: 4,
    title: "Payment Successful",
    description:
      "Your payment of $249.00 has been successfully processed.",
    time: "3 hours ago",
    category: "Payments",
    icon: CreditCard,
    color: "green",
    unread: false,
  },
  {
    id: 5,
    title: "New Team Member",
    description:
      "James Wilson has joined your workspace.",
    time: "Yesterday",
    category: "Team",
    icon: UserPlus,
    color: "pink",
    unread: false,
  },
  {
    id: 6,
    title: "Task Completed",
    description:
      "The website redesign task has been marked as completed.",
    time: "Yesterday",
    category: "Tasks",
    icon: CheckCheck,
    color: "green",
    unread: false,
  },
  {
    id: 7,
    title: "Storage Almost Full",
    description:
      "Your workspace storage is 85% full. Consider upgrading your plan.",
    time: "2 days ago",
    category: "Alerts",
    icon: AlertCircle,
    color: "orange",
    unread: false,
  },
  {
    id: 8,
    title: "New Order Received",
    description:
      "A new order #ORD-8768 has been placed successfully.",
    time: "3 days ago",
    category: "Orders",
    icon: ShoppingBag,
    color: "purple",
    unread: false,
  },
];

const filters = [
  "All",
  "Unread",
  "Orders",
  "Messages",
  "Schedule",
  "Payments",
  "Team",
  "Tasks",
  "Alerts",
];

function Notification() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "All") return true;

    if (activeFilter === "Unread") return item.unread;

    return item.category === activeFilter;
  });

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="notification-page">

      {/* Heading */}
      <div className="notification-heading">
        <div>
          <h2>Notifications</h2>
          <p>
            Stay updated with all your activities and important alerts.
          </p>
        </div>

        <div className="notification-heading-actions">
          <button
            className="mark-all-button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="notification-summary">

        <div className="notification-summary-card">
          <div className="summary-icon purple">
            <Bell size={21} />
          </div>

          <div>
            <p>Total Notifications</p>
            <h3>{notifications.length}</h3>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="summary-icon orange">
            <AlertCircle size={21} />
          </div>

          <div>
            <p>Unread Notifications</p>
            <h3>{unreadCount}</h3>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="summary-icon green">
            <Check size={21} />
          </div>

          <div>
            <p>Read Notifications</p>
            <h3>{notifications.length - unreadCount}</h3>
          </div>
        </div>

      </div>

      {/* Notification Content */}
      <div className="notification-content">

        <div className="notification-content-header">
          <div>
            <h3>All Activity</h3>
            <p>
              You have {unreadCount} unread notifications.
            </p>
          </div>

          <button
            className="clear-all-button"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 size={16} />
            Clear all
          </button>
        </div>

        {/* Filters */}
        <div className="notification-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter ? "active" : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}

              {filter === "Unread" && unreadCount > 0 && (
                <span className="filter-count">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="notification-list">

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`notification-item ${
                    item.unread ? "unread" : ""
                  }`}
                >
                  <div
                    className={`notification-icon ${item.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="notification-details">
                    <div className="notification-title-row">
                      <h4>{item.title}</h4>

                      {item.unread && (
                        <span className="new-label">New</span>
                      )}
                    </div>

                    <p>{item.description}</p>

                    <div className="notification-meta">
                      <span>{item.time}</span>
                      <span className="meta-dot"></span>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <div className="notification-item-actions">

                    {item.unread && (
                      <button
                        title="Mark as read"
                        onClick={() => markAsRead(item.id)}
                      >
                        <Check size={17} />
                      </button>
                    )}

                    <button
                      title="Delete notification"
                      onClick={() =>
                        deleteNotification(item.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>

                    <button title="More options">
                      <MoreHorizontal size={19} />
                    </button>

                  </div>

                  {item.unread && (
                    <span className="notification-unread-dot"></span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="notification-empty">
              <div>
                <Bell size={30} />
              </div>

              <h3>No notifications found</h3>

              <p>
                You're all caught up. There are no notifications
                in this category.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Notification;