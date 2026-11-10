import { useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Circle,
  CheckCircle2,
  Pencil,
  Trash2,
  X,
  CalendarDays,
} from "lucide-react";

import "./Settings.css";

const initialTasks = [
  {
    id: 1,
    title: "Graphic Design",
    status: "To Do",
    priority: "Low",
    progress: "On Track",
    time: "09:30",
    duration: 1,
    members: [12, 11, 13],
  },
  {
    id: 2,
    title: "Dashboard Design",
    status: "Doing",
    priority: "High",
    progress: "On Track",
    time: "11:15",
    duration: 1,
    members: [12, 11, 13],
  },
  {
    id: 3,
    title: "Logo Design",
    status: "Doing",
    priority: "High",
    progress: "On Track",
    time: "13:00",
    duration: 1,
    members: [12, 11, 13],
  },
  {
    id: 4,
    title: "Web Design",
    status: "Done",
    priority: "High",
    progress: "On Track",
    time: "14:30",
    duration: 1,
    members: [12, 11, 13],
  },
];

const statusOptions = ["To Do", "Doing", "Done"];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function Settings() {
  const [tasks, setTasks] = useState(initialTasks);

  const [activeStatus, setActiveStatus] = useState("To Do");

  const [selectedDate, setSelectedDate] = useState(
    new Date(2021, 11, 2)
  );

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    status: "To Do",
    priority: "Low",
    progress: "On Track",
    time: "09:00",
    duration: 1,
  });

  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredTasks = tasks.filter(
    (task) => task.status === activeStatus
  );

  function changeDate(direction) {
    setSelectedDate((previous) => {
      const next = new Date(previous);
      next.setDate(next.getDate() + direction);
      return next;
    });
  }

  function toggleTask(id) {
    setSelectedTaskIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function openAddModal() {
    setEditingTask(null);

    setFormData({
      title: "",
      status: activeStatus,
      priority: "Low",
      progress: "On Track",
      time: "09:00",
      duration: 1,
    });

    setShowModal(true);
  }

  function openEditModal(task) {
    setEditingTask(task);

    setFormData({
      title: task.title,
      status: task.status,
      priority: task.priority,
      progress: task.progress,
      time: task.time,
      duration: task.duration,
    });

    setShowModal(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData }
            : task
        )
      );
    } else {
      setTasks((previous) => [
        ...previous,
        {
          ...formData,
          id: Date.now(),
          members: [12, 11, 13],
        },
      ]);
    }

    setShowModal(false);
    setEditingTask(null);
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );

    setSelectedTaskIds((previous) =>
      previous.filter((item) => item !== id)
    );
  }

  function getTaskPosition(time) {
    const [hours, minutes] = time.split(":").map(Number);

    return (hours - 9) * 60 + minutes;
  }

  function getTaskStyle(task) {
    const minutes = getTaskPosition(task.time);

    return {
      top: `${minutes}px`,
      height: `${Math.max(task.duration * 60 - 18, 48)}px`,
    };
  }

  function TaskCard({ task }) {
    const isSelected = selectedTaskIds.includes(task.id);

    return (
      <div
        className={`timeline-task-card ${
          isSelected ? "task-selected" : ""
        }`}
        style={getTaskStyle(task)}
      >
        <button
          className={`timeline-task-check ${
            isSelected ? "checked" : ""
          }`}
          onClick={() => toggleTask(task.id)}
          title="Select task"
        >
          {isSelected ? (
            <CheckCircle2 size={15} />
          ) : (
            <Circle size={15} />
          )}
        </button>

        <h4>{task.title}</h4>

        <div className="timeline-members">
          {task.members.map((member, index) => (
            <img
              key={index}
              src={`https://i.pravatar.cc/60?img=${member}`}
              alt="Team member"
            />
          ))}

          <button title="Add member">
            <Plus size={12} />
          </button>
        </div>

        <span
          className={`timeline-priority ${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

        <span className="timeline-progress">
          {task.progress}
        </span>

        <div className="timeline-card-actions">
          <button
            onClick={() => openEditModal(task)}
            title="Edit task"
          >
            <Pencil size={12} />
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            title="Delete task"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">

      {/* HEADER */}

      <div className="settings-header">
        <div>
          <h2>Task Preview</h2>
          <p>Manage your tasks and daily activities.</p>
        </div>

        <button
          className="settings-add-btn"
          onClick={openAddModal}
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* MAIN CONTENT */}

      <div className="settings-timeline-layout">

        {/* LEFT STATUS PANEL */}

        <aside className="settings-status-panel">
          {statusOptions.map((status) => (
            <button
              key={status}
              className={
                activeStatus === status ? "active" : ""
              }
              onClick={() => setActiveStatus(status)}
            >
              <span>{status}</span>
              <ChevronRight size={15} />
            </button>
          ))}
        </aside>

        {/* RIGHT TIMELINE */}

        <main className="settings-timeline-content">

          {/* DATE HEADER */}

          <div className="settings-date-header">

            <div className="settings-date-navigation">
              <button onClick={() => changeDate(-1)}>
                <ChevronLeft size={17} />
              </button>

              <strong>
                {monthNames[selectedDate.getMonth()]}{" "}
                {selectedDate.getFullYear()}
              </strong>

              <button onClick={() => changeDate(1)}>
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="settings-selected-date">
              <CalendarDays size={14} />

              {selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}

              <ChevronDown size={13} />
            </div>
          </div>

          {/* DATE STRIP */}

          <div className="settings-date-strip">
            {Array.from({ length: 14 }, (_, index) => {
              const date = new Date(selectedDate);

              date.setDate(date.getDate() - 3 + index);

              const selected =
                date.toDateString() ===
                selectedDate.toDateString();

              return (
                <button
                  key={index}
                  className={selected ? "active" : ""}
                  onClick={() => setSelectedDate(date)}
                >
                  <span>
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>

                  <strong>
                    {String(date.getDate()).padStart(2, "0")}
                  </strong>
                </button>
              );
            })}
          </div>

          {/* TIME GRID */}

          <div className="settings-timeline-grid">

            <div className="settings-time-labels">
              {timeSlots.map((time) => (
                <div key={time}>{time}</div>
              ))}
            </div>

            <div className="settings-timeline-track">

              {timeSlots.map((time) => (
                <div
                  className="settings-time-row"
                  key={time}
                />
              ))}

              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                />
              ))}

              {filteredTasks.length === 0 && (
                <div className="settings-no-tasks">
                  No tasks in {activeStatus}.

                  <button onClick={openAddModal}>
                    Add a task
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <div
          className="settings-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="settings-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="settings-modal-header">
              <h3>
                {editingTask ? "Edit Task" : "Add New Task"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="settings-form-group">
                <label>Task Name</label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      title: event.target.value,
                    })
                  }
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="settings-form-group">
                <label>Status</label>

                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      status: event.target.value,
                    })
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="settings-form-group">
                <label>Time</label>

                <input
                  type="time"
                  min="09:00"
                  max="16:59"
                  value={formData.time}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      time: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="settings-form-group">
                <label>Duration (hours)</label>

                <select
                  value={formData.duration}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      duration: Number(event.target.value),
                    })
                  }
                >
                  <option value={1}>1 Hour</option>
                  <option value={2}>2 Hours</option>
                  <option value={3}>3 Hours</option>
                </select>
              </div>

              <div className="settings-form-group">
                <label>Priority</label>

                <select
                  value={formData.priority}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      priority: event.target.value,
                    })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="settings-form-group">
                <label>Progress</label>

                <select
                  value={formData.progress}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      progress: event.target.value,
                    })
                  }
                >
                  <option>On Track</option>
                  <option>At risk</option>
                </select>
              </div>

              <div className="settings-modal-actions">
                <button
                  type="button"
                  className="settings-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="settings-save-btn"
                >
                  {editingTask ? "Save Changes" : "Add Task"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;