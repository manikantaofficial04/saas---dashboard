import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  CalendarDays,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
  LayoutGrid,
  List,
  MoreHorizontal,
  MessageCircle,
  Heart,
  CheckCircle2,
  Circle,
  Filter,
} from "lucide-react";

import "./Schedule.css";

/* =====================================
   SCHEDULE DATA
===================================== */

const initialSchedules = [
  { id: 1, date: "12 Dec, 2021", time: "10.15AM", location: "Office Meeting" },
  { id: 2, date: "10 Dec, 2021", time: "11.20AM", location: "Home" },
  { id: 3, date: "09 Dec, 2021", time: "11.45AM", location: "Friends Zone" },
  { id: 4, date: "08 Dec, 2021", time: "12.15PM", location: "Office Meeting" },
  { id: 5, date: "07 Dec, 2021", time: "01.20PM", location: "Home" },
  { id: 6, date: "05 Dec, 2021", time: "10.15AM", location: "Meeting Outside" },
  { id: 7, date: "04 Dec, 2021", time: "11.15AM", location: "Office Meeting" },
  { id: 8, date: "04 Dec, 2021", time: "01.25PM", location: "Home" },
  { id: 9, date: "02 Dec, 2021", time: "10.15AM", location: "Friends" },
  { id: 10, date: "01 Dec, 2021", time: "04.30PM", location: "Meeting Outside" },
];

/* =====================================
   PEOPLE DATA
===================================== */

const people = [
  {
    id: 1,
    name: "Eddie Lobanovskiy",
    email: "lobanovskiy@gmail.com",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Alexey Stave",
    email: "alexey.st@gmail.com",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 3,
    name: "Anton Tkachev",
    email: "tkacheveanton@gmail.com",
    image: "https://i.pravatar.cc/100?img=13",
  },
];

/* =====================================
   TASK BOARD DATA
===================================== */

const initialTasks = [
  {
    id: 1,
    title: "Dashboard Design",
    status: "To Do",
    priority: "Low",
    progress: "On Track",
    description: "Discussion for management dashboard ui design",
    comments: 112,
    likes: "1.2k",
    members: [12, 11, 13],
    images: [],
  },
  {
    id: 2,
    title: "Landing page Design",
    status: "To Do",
    priority: "Medium",
    progress: "At risk",
    description: "Discussion for management dashboard ui design",
    comments: 0,
    likes: "",
    members: [12, 11, 13],
    images: [],
  },
  {
    id: 3,
    title: "E-Shop Mobile App",
    status: "To Do",
    priority: "High",
    progress: "",
    description: "Discussion for management dashboard ui design",
    comments: 0,
    likes: "",
    members: [12, 11, 13],
    images: [],
  },
  {
    id: 4,
    title: "Dashboard Design",
    status: "In Progress",
    priority: "High",
    progress: "On Track",
    description: "Discussion for management dashboard ui design",
    comments: 112,
    likes: "1.2k",
    members: [12, 11, 13],
    images: ["design", "illustration"],
  },
  {
    id: 5,
    title: "Landing page Design",
    status: "In Progress",
    priority: "Low",
    progress: "",
    description: "Discussion for management dashboard ui design",
    comments: 0,
    likes: "",
    members: [12, 11, 13],
    images: [],
  },
  {
    id: 6,
    title: "E-Shop Mobile App",
    status: "In Progress",
    priority: "Low",
    progress: "On Track",
    description: "Discussion for management dashboard ui design",
    comments: 112,
    likes: "1.2k",
    members: [12, 11, 13],
    images: [],
  },
  {
    id: 7,
    title: "Dashboard Design",
    status: "In Review",
    priority: "Medium",
    progress: "",
    description: "Discussion for management dashboard ui design",
    comments: 0,
    likes: "",
    members: [12, 11, 13],
    images: ["design"],
  },
  {
    id: 8,
    title: "E-Shop Mobile App",
    status: "In Review",
    priority: "Low",
    progress: "",
    description: "Discussion for management dashboard ui design",
    comments: 0,
    likes: "",
    members: [12, 11, 13],
    images: ["illustration"],
  },
  {
    id: 9,
    title: "Dashboard Design",
    status: "Done",
    priority: "High",
    progress: "On Track",
    description: "Discussion for management dashboard ui design",
    comments: 112,
    likes: "1.2k",
    members: [12, 11, 13],
    images: [],
  },
];

const taskColumns = ["To Do", "In Progress", "In Review", "Done"];

/* =====================================
   MAIN COMPONENT
===================================== */

function Schedule() {
  const [activeTab, setActiveTab] = useState("list");

  /* SCHEDULE STATES */

  const [schedules, setSchedules] = useState(initialSchedules);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [peopleSearch, setPeopleSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(3);
  const [currentMonth, setCurrentMonth] = useState(11);
  const [currentYear, setCurrentYear] = useState(2021);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "",
    location: "",
  });

  /* TASK STATES */

  const [tasks, setTasks] = useState(initialTasks);
  const [taskSearch, setTaskSearch] = useState("");
  const [taskFilter, setTaskFilter] = useState("All");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    status: "To Do",
    priority: "Low",
    progress: "On Track",
    description: "",
  });

  /* CALENDAR */

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const previousMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        outside: true,
      });
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push({
        day,
        outside: false,
      });
    }

    while (days.length % 7 !== 0) {
      days.push({
        day: days.length - firstDay - totalDays + 1,
        outside: true,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  const filteredPeople = people.filter((person) =>
    `${person.name} ${person.email}`
      .toLowerCase()
      .includes(peopleSearch.toLowerCase())
  );

  function changeMonth(direction) {
    const nextDate = new Date(currentYear, currentMonth + direction, 1);

    setCurrentMonth(nextDate.getMonth());
    setCurrentYear(nextDate.getFullYear());
  }

  /* =====================================
     SCHEDULE FUNCTIONS
  ===================================== */

  function toggleSchedule(id) {
    setSelectedSchedules((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function toggleAllSchedules(event) {
    setSelectedSchedules(
      event.target.checked ? schedules.map((item) => item.id) : []
    );
  }

  function deleteSchedule(id) {
    setSchedules((previous) =>
      previous.filter((schedule) => schedule.id !== id)
    );

    setSelectedSchedules((previous) =>
      previous.filter((item) => item !== id)
    );
  }

  function openAddSchedule() {
    setEditingSchedule(null);

    setScheduleForm({
      date: "",
      time: "",
      location: "",
    });

    setShowScheduleModal(true);
  }

  function openEditSchedule(schedule) {
    const parsedDate = new Date(schedule.date);

    const dateValue = `${parsedDate.getFullYear()}-${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`;

    setEditingSchedule(schedule);

    setScheduleForm({
      date: dateValue,
      time: schedule.time,
      location: schedule.location,
    });

    setShowScheduleModal(true);
  }

  function handleScheduleSubmit(event) {
    event.preventDefault();

    const formattedDate = new Date(
      `${scheduleForm.date}T00:00:00`
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if (editingSchedule) {
      setSchedules((previous) =>
        previous.map((schedule) =>
          schedule.id === editingSchedule.id
            ? {
                ...schedule,
                date: formattedDate,
                time: scheduleForm.time,
                location: scheduleForm.location,
              }
            : schedule
        )
      );
    } else {
      setSchedules((previous) => [
        {
          id: Date.now(),
          date: formattedDate,
          time: scheduleForm.time,
          location: scheduleForm.location,
        },
        ...previous,
      ]);
    }

    setShowScheduleModal(false);
  }

  /* =====================================
     TASK FUNCTIONS
  ===================================== */

  function openAddTask() {
    setEditingTask(null);

    setTaskForm({
      title: "",
      status: "To Do",
      priority: "Low",
      progress: "On Track",
      description: "",
    });

    setShowTaskModal(true);
  }

  function openEditTask(task) {
    setEditingTask(task);

    setTaskForm({
      title: task.title,
      status: task.status,
      priority: task.priority,
      progress: task.progress || "On Track",
      description: task.description,
    });

    setShowTaskModal(true);
  }

  function handleTaskSubmit(event) {
    event.preventDefault();

    if (editingTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskForm }
            : task
        )
      );
    } else {
      setTasks((previous) => [
        {
          ...taskForm,
          id: Date.now(),
          comments: 0,
          likes: "",
          members: [12, 11, 13],
          images: [],
        },
        ...previous,
      ]);
    }

    setShowTaskModal(false);
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  function moveTask(task, newStatus) {
    setTasks((previous) =>
      previous.map((item) =>
        item.id === task.id
          ? { ...item, status: newStatus }
          : item
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      `${task.title} ${task.description}`
        .toLowerCase()
        .includes(taskSearch.toLowerCase());

    const matchesFilter =
      taskFilter === "All" || task.priority === taskFilter;

    return matchesSearch && matchesFilter;
  });

  /* =====================================
     TASK CARD
  ===================================== */

  function TaskCard({ task }) {
    return (
      <div className="task-card">

        <div className="task-card-top">

          <button
            className={`task-check ${
              task.status !== "To Do" ? "checked" : ""
            }`}
            onClick={() =>
              moveTask(
                task,
                task.status === "Done" ? "To Do" : "Done"
              )
            }
            title="Toggle task completion"
          >
            {task.status !== "To Do" ? (
              <CheckCircle2 size={16} />
            ) : (
              <Circle size={16} />
            )}
          </button>

          <h4>{task.title}</h4>

          <div className="task-menu">
            <button
              onClick={() => openEditTask(task)}
              title="Edit task"
            >
              <Pencil size={13} />
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              title="Delete task"
            >
              <Trash2 size={13} />
            </button>
          </div>

        </div>

        <div className="task-tags">

          <span className={`priority-tag ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          {task.progress && (
            <span
              className={`progress-tag ${
                task.progress.toLowerCase().replace(" ", "-")
              }`}
            >
              {task.progress}
            </span>
          )}

        </div>

        <p className="task-description">
          {task.description}
        </p>

        {task.images.length > 0 && (
          <div className="task-previews">
            {task.images.map((image, index) => (
              <div
                key={index}
                className={`task-preview-image ${image}`}
              >
                {image === "design" ? (
                  <LayoutGrid size={25} />
                ) : (
                  <Heart size={25} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="task-card-footer">

          <div className="task-members">
            {task.members.map((member, index) => (
              <img
                key={index}
                src={`https://i.pravatar.cc/60?img=${member}`}
                alt="Team member"
              />
            ))}

            <button className="add-member-btn">
              <Plus size={13} />
            </button>
          </div>

          <div className="task-social">
            <span>
              <MessageCircle size={13} />
              {task.comments}
            </span>

            {task.likes && (
              <span>
                <Heart size={13} />
                {task.likes}
              </span>
            )}
          </div>

        </div>

        <div className="task-card-move">
          <select
            value={task.status}
            onChange={(event) =>
              moveTask(task, event.target.value)
            }
            aria-label="Move task to another column"
          >
            {taskColumns.map((column) => (
              <option key={column} value={column}>
                Move to: {column}
              </option>
            ))}
          </select>
        </div>

      </div>
    );
  }

  /* =====================================
     PAGE UI
  ===================================== */

  return (
    <div className="schedule-page">

      {/* PAGE HEADER */}

      <div className="schedule-header">

        <div>
          <h2>
            {activeTab === "list" ? "Schedule List" : "Task Preview"}
          </h2>
          <p>
            {activeTab === "list"
              ? "Manage your schedules and meetings."
              : "Organize and track your team's tasks."}
          </p>
        </div>

        <button
          className="schedule-add-btn"
          onClick={activeTab === "list" ? openAddSchedule : openAddTask}
        >
          <Plus size={17} />
          {activeTab === "list" ? "Add New" : "Add Task"}
        </button>

      </div>

      {/* PAGE TABS */}

      <div className="schedule-tabs">

        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          <List size={15} />
          Schedule List
        </button>

        <button
          className={activeTab === "board" ? "active" : ""}
          onClick={() => setActiveTab("board")}
        >
          <LayoutGrid size={15} />
          Task Board
        </button>

      </div>

      {/* =====================================
          SCHEDULE LIST TAB
      ===================================== */}

      {activeTab === "list" && (

        <div className="schedule-layout">

          {/* LEFT PANEL */}

          <aside className="schedule-sidebar">

            <button
              className="create-schedule-btn"
              onClick={openAddSchedule}
            >
              <Plus size={17} />
              Create Schedule
            </button>

            {/* CALENDAR */}

            <div className="mini-calendar">

              <div className="calendar-header">

                <span>
                  {monthNames[currentMonth]} {currentYear}
                </span>

                <div>
                  <button onClick={() => changeMonth(-1)}>
                    <ChevronLeft size={15} />
                  </button>

                  <button onClick={() => changeMonth(1)}>
                    <ChevronRight size={15} />
                  </button>
                </div>

              </div>

              <div className="calendar-weekdays">
                {["S", "M", "T", "W", "T", "F", "S"].map(
                  (day, index) => (
                    <span key={index}>{day}</span>
                  )
                )}
              </div>

              <div className="calendar-days">

                {calendarDays.map((item, index) => (
                  <button
                    key={index}
                    className={`
                      calendar-day
                      ${item.outside ? "outside-month" : ""}
                      ${
                        !item.outside && selectedDate === item.day
                          ? "selected-day"
                          : ""
                      }
                    `}
                    disabled={item.outside}
                    onClick={() => setSelectedDate(item.day)}
                  >
                    {item.day}
                  </button>
                ))}

              </div>

            </div>

            {/* PEOPLE */}

            <div className="schedule-people">

              <h3>People</h3>

              <div className="people-search">
                <Search size={15} />

                <input
                  type="text"
                  placeholder="Search for People"
                  value={peopleSearch}
                  onChange={(event) =>
                    setPeopleSearch(event.target.value)
                  }
                />
              </div>

              <div className="people-list">

                {filteredPeople.map((person) => (
                  <div className="person-item" key={person.id}>

                    <img src={person.image} alt={person.name} />

                    <div>
                      <h4>{person.name}</h4>
                      <p>{person.email}</p>
                    </div>

                  </div>
                ))}

                {filteredPeople.length === 0 && (
                  <p className="no-people">No people found.</p>
                )}

              </div>

            </div>

            <button
              className="my-schedule-btn"
              onClick={() => {
                setSelectedSchedules([]);
                setPeopleSearch("");
              }}
            >
              My Schedule
            </button>

          </aside>

          {/* RIGHT PANEL */}

          <div className="schedule-content">

            <div className="schedule-table-header">

              <div className="schedule-select-all">
                <input
                  type="checkbox"
                  checked={
                    schedules.length > 0 &&
                    selectedSchedules.length === schedules.length
                  }
                  onChange={toggleAllSchedules}
                />
              </div>

              <span>Date <small>▼</small></span>
              <span>Time <small>▼</small></span>
              <span>Location <small>▼</small></span>
              <span></span>

            </div>

            <div className="schedule-list">

              {schedules.map((schedule) => (
                <div className="schedule-row" key={schedule.id}>

                  <div className="schedule-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSchedules.includes(schedule.id)}
                      onChange={() => toggleSchedule(schedule.id)}
                    />
                  </div>

                  <div className="schedule-date">
                    <CalendarDays size={15} />
                    <span>{schedule.date}</span>
                  </div>

                  <div className="schedule-time">
                    <Clock size={14} />
                    <span>{schedule.time}</span>
                  </div>

                  <div className="schedule-location">
                    <span className="location-badge">
                      <MapPin size={15} />
                      {schedule.location}
                    </span>
                  </div>

                  <div className="schedule-actions">

                    <button
                      className="schedule-edit-btn"
                      onClick={() => openEditSchedule(schedule)}
                      title="Edit schedule"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      className="schedule-delete-btn"
                      onClick={() => deleteSchedule(schedule.id)}
                      title="Delete schedule"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </div>
              ))}

              {schedules.length === 0 && (
                <div className="schedule-empty">
                  No schedules available.
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* =====================================
          TASK BOARD TAB
      ===================================== */}

      {activeTab === "board" && (

        <div className="task-board-page">

          {/* BOARD TOOLBAR */}

          <div className="task-board-toolbar">

            <div className="task-view-switch">
              <button
                className="selected"
                onClick={() => setActiveTab("list")}
              >
                List
              </button>

              <button className="selected-board">
                Board
              </button>

              <button disabled>
                Timeline
              </button>
            </div>

            <div className="task-board-actions">

              <div className="task-search">
                <Search size={15} />

                <input
                  type="text"
                  placeholder="Search"
                  value={taskSearch}
                  onChange={(event) =>
                    setTaskSearch(event.target.value)
                  }
                />
              </div>

              <div className="task-filter">
                <Filter size={15} />

                <select
                  value={taskFilter}
                  onChange={(event) =>
                    setTaskFilter(event.target.value)
                  }
                >
                  <option value="All">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

            </div>

          </div>

          {/* BOARD COLUMNS */}

          <div className="task-board">

            {taskColumns.map((column) => {

              const columnTasks = filteredTasks.filter(
                (task) => task.status === column
              );

              return (

                <div className="task-column" key={column}>

                  <div className="task-column-header">

                    <h3>{column}</h3>

                    <span>{columnTasks.length}</span>

                    <button
                      onClick={openAddTask}
                      title="Add task"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                  <div className="task-column-content">

                    {columnTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="empty-task-column">
                        No tasks
                      </div>
                    )}

                  </div>

                </div>

              );
            })}

          </div>

        </div>
      )}

      {/* =====================================
          SCHEDULE MODAL
      ===================================== */}

      {showScheduleModal && (

        <div
          className="schedule-modal-overlay"
          onClick={() => setShowScheduleModal(false)}
        >

          <div
            className="schedule-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="schedule-modal-header">

              <h3>
                {editingSchedule ? "Edit Schedule" : "Create Schedule"}
              </h3>

              <button onClick={() => setShowScheduleModal(false)}>
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleScheduleSubmit}>

              <div className="schedule-form-group">
                <label>Date</label>

                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={(event) =>
                    setScheduleForm({
                      ...scheduleForm,
                      date: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="schedule-form-group">
                <label>Time</label>

                <input
                  type="text"
                  placeholder="10.15AM"
                  value={scheduleForm.time}
                  onChange={(event) =>
                    setScheduleForm({
                      ...scheduleForm,
                      time: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="schedule-form-group">
                <label>Location</label>

                <select
                  value={scheduleForm.location}
                  onChange={(event) =>
                    setScheduleForm({
                      ...scheduleForm,
                      location: event.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select location</option>
                  <option value="Office Meeting">Office Meeting</option>
                  <option value="Home">Home</option>
                  <option value="Friends Zone">Friends Zone</option>
                  <option value="Meeting Outside">Meeting Outside</option>
                  <option value="Friends">Friends</option>
                </select>
              </div>

              <div className="schedule-modal-actions">

                <button
                  type="button"
                  className="schedule-cancel-btn"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="schedule-save-btn"
                >
                  {editingSchedule ? "Save Changes" : "Create Schedule"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================
          TASK MODAL
      ===================================== */}

      {showTaskModal && (

        <div
          className="schedule-modal-overlay"
          onClick={() => setShowTaskModal(false)}
        >

          <div
            className="schedule-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="schedule-modal-header">

              <h3>
                {editingTask ? "Edit Task" : "Create Task"}
              </h3>

              <button onClick={() => setShowTaskModal(false)}>
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleTaskSubmit}>

              <div className="schedule-form-group">
                <label>Task Name</label>

                <input
                  type="text"
                  placeholder="Enter task name"
                  value={taskForm.title}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      title: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="schedule-form-group">
                <label>Description</label>

                <input
                  type="text"
                  placeholder="Enter task description"
                  value={taskForm.description}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      description: event.target.value,
                    })
                  }
                />
              </div>

              <div className="schedule-form-group">
                <label>Status</label>

                <select
                  value={taskForm.status}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      status: event.target.value,
                    })
                  }
                >
                  {taskColumns.map((column) => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
              </div>

              <div className="schedule-form-group">
                <label>Priority</label>

                <select
                  value={taskForm.priority}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      priority: event.target.value,
                    })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="schedule-form-group">
                <label>Progress</label>

                <select
                  value={taskForm.progress}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      progress: event.target.value,
                    })
                  }
                >
                  <option value="On Track">On Track</option>
                  <option value="At risk">At risk</option>
                </select>
              </div>

              <div className="schedule-modal-actions">

                <button
                  type="button"
                  className="schedule-cancel-btn"
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="schedule-save-btn"
                >
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Schedule;