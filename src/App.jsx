import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

// Dashboard Pages
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Invoice from "./pages/Invoice.jsx";
import Schedule from "./pages/Schedule.jsx";
import Calendar from "./pages/Calendar.jsx";
import Messages from "./pages/Messages.jsx";
import Notification from "./pages/Notification.jsx";
import Settings from "./pages/Settings.jsx";

// Authentication Pages
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Recover from "./pages/auth/Recover.jsx";
import Confirm from "./pages/auth/Confirm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/confirm" element={<Confirm />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Analytics */}
          <Route
            path="/analytics"
            element={<Analytics />}
          />

          {/* Invoice */}
          <Route
            path="/invoice"
            element={<Invoice />}
          />

          {/* Schedule */}
          <Route
            path="/schedule"
            element={<Schedule />}
          />

          {/* Calendar */}
          <Route
            path="/calendar"
            element={<Calendar />}
          />

          {/* Messages */}
          <Route
            path="/messages"
            element={<Messages />}
          />

          {/* Notifications */}
          <Route
            path="/notification"
            element={<Notification />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

        {/* Invalid Routes */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;