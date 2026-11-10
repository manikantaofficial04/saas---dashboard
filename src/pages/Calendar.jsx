import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  LayoutGrid,
  List,
  Clock,
  Filter,
} from "lucide-react";

import "./Calendar.css";

const initialTasks = [
  { id: 1, name: "UI Design", startDate: "03/12/2021", endDate: "05/12/2021", members: "5 Member", status: "Pending", stage: "To Do", icon: "🎨" },
  { id: 2, name: "Logo Design", startDate: "03/12/2021", endDate: "05/12/2021", members: "5 Member", status: "Pending", stage: "To Do", icon: "▣" },
  { id: 3, name: "Graphic Design", startDate: "03/12/2021", endDate: "05/12/2021", members: "5 Member", status: "Running", stage: "Doing", icon: "▣" },
  { id: 4, name: "Web Design", startDate: "03/12/2021", endDate: "05/12/2021", members: "5 Member", status: "Running", stage: "Doing", icon: "▧" },
  { id: 5, name: "Logo Design", startDate: "01/12/2021", endDate: "03/12/2021", members: "5 Member", status: "Done", stage: "Done", icon: "▣" },
];

const stages = ["To Do", "Doing", "Done"];

const people = [
  { id: 1, name: "Eddie Lobanovskiy", email: "lobanovskiy@gmail.com", image: "https://i.pravatar.cc/100?img=12" },
  { id: 2, name: "Alexey Stave", email: "alexey.st@gmail.com", image: "https://i.pravatar.cc/100?img=11" },
  { id: 3, name: "Anton Tkachev", email: "tkacheveanton@gmail.com", image: "https://i.pravatar.cc/100?img=13" },
];

const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

function Calendar() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState("calendar");
  const [calendarMode, setCalendarMode] = useState("Year");
  const [currentDate, setCurrentDate] = useState(new Date(2021, 11, 2));
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 11, 2));
  const [peopleSearch, setPeopleSearch] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    members: "5 Member",
    status: "Pending",
    stage: "To Do",
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        `${task.name} ${task.members} ${task.status}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || task.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, filterStatus]);

  const filteredPeople = people.filter((person) =>
    `${person.name} ${person.email}`
      .toLowerCase()
      .includes(peopleSearch.toLowerCase())
  );

  function changePeriod(amount) {
    const next = new Date(currentDate);

    if (calendarMode === "Year") {
      next.setFullYear(next.getFullYear() + amount);
    } else if (calendarMode === "Month") {
      next.setMonth(next.getMonth() + amount);
    } else if (calendarMode === "Week") {
      next.setDate(next.getDate() + amount * 7);
    } else {
      next.setDate(next.getDate() + amount);
    }

    setCurrentDate(next);
    setSelectedDate(next);
  }

  function selectDay(year, month, day) {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    setCurrentDate(date);
  }

  function openAddModal(stage = "To Do") {
    setEditingTask(null);
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      members: "5 Member",
      status: "Pending",
      stage,
    });
    setShowModal(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setFormData({
      name: task.name,
      startDate: task.startDate,
      endDate: task.endDate,
      members: task.members,
      status: task.status,
      stage: task.stage,
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
        { ...formData, id: Date.now(), icon: "▣" },
      ]);
    }

    setShowModal(false);
  }

  function deleteTask(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
    setSelectedTasks((previous) => previous.filter((item) => item !== id));
  }

  function changeTaskStage(id, stage) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              stage,
              status: stage === "Done" ? "Done" : stage === "Doing" ? "Running" : "Pending",
            }
          : task
      )
    );
  }

  function toggleTask(id) {
    setSelectedTasks((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function formatDateForInput(value) {
    if (!value) return "";
    const [day, month, year] = value.split("/");
    return `${year}-${month}-${day}`;
  }

  function formatDateForTable(value) {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  function TaskRow({ task }) {
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            checked={selectedTasks.includes(task.id)}
            onChange={() => toggleTask(task.id)}
          />
        </td>
        <td>
          <div className="calendar-task-name">
            <span className="calendar-task-icon">{task.icon}</span>
            {task.name}
          </div>
        </td>
        <td>{task.startDate}</td>
        <td className="calendar-end-date">{task.endDate}</td>
        <td>{task.members}</td>
        <td>
          <span className={`calendar-status ${task.status.toLowerCase()}`}>
            {task.status}
          </span>
        </td>
        <td>
          <div className="calendar-row-actions">
            <button className="calendar-edit-btn" onClick={() => openEditModal(task)}>
              <Pencil size={13} />
            </button>
            <button className="calendar-delete-btn" onClick={() => deleteTask(task.id)}>
              <Trash2 size={13} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  function TaskSection({ stage }) {
    const sectionTasks = filteredTasks.filter((task) => task.stage === stage);

    return (
      <section className="calendar-task-section">
        <div className="calendar-section-header">
          <h3>{stage}</h3>
          <button onClick={() => openAddModal(stage)}>See More</button>
        </div>

        <div className="calendar-table-wrapper">
          <table className="calendar-task-table">
            <thead>
              <tr>
                <th>Check Box</th>
                <th>Task Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Member</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sectionTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
              {sectionTasks.length === 0 && (
                <tr><td colSpan="7" className="calendar-empty">No tasks available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  function MiniCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const previousDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: previousDays - i, outside: true });
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push({ day, outside: false });
    }

    while (days.length % 7 !== 0) {
      days.push({ day: days.length - firstDay - totalDays + 1, outside: true });
    }

    return (
      <div className="mini-calendar">
        <div className="mini-calendar-header">
          <span>{monthNames[month]} {year}</span>
          <div>
            <button onClick={() => changePeriod(-1)}><ChevronLeft size={14} /></button>
            <button onClick={() => changePeriod(1)}><ChevronRight size={14} /></button>
          </div>
        </div>

        <div className="mini-calendar-weekdays">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>

        <div className="mini-calendar-days">
          {days.map((item, index) => {
            const isSelected =
              !item.outside &&
              selectedDate.getFullYear() === year &&
              selectedDate.getMonth() === month &&
              selectedDate.getDate() === item.day;

            return (
              <button
                key={index}
                disabled={item.outside}
                className={`${item.outside ? "outside" : ""} ${isSelected ? "selected" : ""}`}
                onClick={() => selectDay(year, month, item.day)}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function PeoplePanel() {
    return (
      <aside className="calendar-sidebar-panel">
        <button className="calendar-create-schedule" onClick={() => openAddModal()}>
          <Plus size={15} /> Create Schedule
        </button>

        <MiniCalendar />

        <div className="calendar-people">
          <h3>People</h3>
          <div className="calendar-people-search">
            <Search size={13} />
            <input
              placeholder="Search for People"
              value={peopleSearch}
              onChange={(event) => setPeopleSearch(event.target.value)}
            />
          </div>

          {filteredPeople.map((person) => (
            <div className="calendar-person" key={person.id}>
              <img src={person.image} alt={person.name} />
              <div>
                <h4>{person.name}</h4>
                <p>{person.email}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="calendar-my-schedule" onClick={() => {
          setSelectedDate(new Date());
          setCurrentDate(new Date());
        }}>
          My Schedule
        </button>
      </aside>
    );
  }

  function MonthGrid({ year, month }) {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const previousDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: previousDays - i, outside: true });
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push({ day, outside: false });
    }

    while (days.length % 7 !== 0) {
      days.push({ day: days.length - firstDay - totalDays + 1, outside: true });
    }

    return (
      <div className="year-month">
        <h3>{monthNames[month]} {year}</h3>

        <div className="year-weekdays">
          {["S", "S", "M", "T", "W", "T", "F"].map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>

        <div className="year-month-days">
          {days.map((item, index) => {
            const isSelected =
              !item.outside &&
              selectedDate.getFullYear() === year &&
              selectedDate.getMonth() === month &&
              selectedDate.getDate() === item.day;

            return (
              <button
                key={index}
                className={`${item.outside ? "outside" : ""} ${isSelected ? "selected" : ""}`}
                disabled={item.outside}
                onClick={() => selectDay(year, month, item.day)}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function CalendarView() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    return (
      <div className="calendar-main-layout">
        <PeoplePanel />

        <div className="calendar-view-content">
          <div className="calendar-period-toolbar">
            <button onClick={() => changePeriod(-1)}><ChevronLeft size={16} /></button>
            <strong>
              {calendarMode === "Year"
                ? year
                : calendarMode === "Month"
                ? `${monthNames[month]} ${year}`
                : calendarMode === "Week"
                ? `Week of ${selectedDate.toLocaleDateString()}`
                : selectedDate.toDateString()}
            </strong>
            <button onClick={() => changePeriod(1)}><ChevronRight size={16} /></button>
          </div>

          {calendarMode === "Year" && (
            <div className="year-calendar-grid">
              {monthNames.map((_, index) => (
                <MonthGrid key={index} year={year} month={index} />
              ))}
            </div>
          )}

          {calendarMode === "Month" && (
            <div className="single-month-calendar">
              <MonthGrid year={year} month={month} />
            </div>
          )}

          {calendarMode === "Day" && (
            <div className="calendar-day-view">
              <CalendarDays size={30} />
              <h3>{selectedDate.toDateString()}</h3>
              <p>Your selected day's schedule.</p>
              {tasks.filter((task) => task.startDate === selectedDate.toLocaleDateString("en-GB")).map((task) => (
                <div key={task.id}>{task.name} — {task.status}</div>
              ))}
            </div>
          )}

          {calendarMode === "Week" && (
            <div className="calendar-week-view">
              {Array.from({ length: 7 }, (_, index) => {
                const date = new Date(selectedDate);
                date.setDate(date.getDate() - date.getDay() + index);

                return (
                  <button
                    key={index}
                    className={date.toDateString() === selectedDate.toDateString() ? "selected" : ""}
                    onClick={() => setSelectedDate(date)}
                  >
                    <span>{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                    <strong>{date.getDate()}</strong>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <div className="calendar-page-header">
        <div>
          <h2>{activeTab === "calendar" ? "Calendar" : "Task Preview"}</h2>
          <p>{activeTab === "calendar" ? "View and manage your schedule." : "Manage and track your project tasks."}</p>
        </div>

        <button
          className="calendar-add-btn"
          onClick={() => openAddModal()}
        >
          <Plus size={16} />
          {activeTab === "calendar" ? "Create Schedule" : "Add Task"}
        </button>
      </div>

      <div className="calendar-toolbar">
        <div className="calendar-view-tabs">
          <button className={activeTab === "list" ? "active" : ""} onClick={() => setActiveTab("list")}>
            <List size={14} /> List
          </button>
          <button className={activeTab === "board" ? "active" : ""} onClick={() => setActiveTab("board")}>
            <LayoutGrid size={14} /> Board
          </button>
          <button className={activeTab === "timeline" ? "active" : ""} onClick={() => setActiveTab("timeline")}>
            <Clock size={14} /> Timeline
          </button>
          <button className={activeTab === "calendar" ? "active" : ""} onClick={() => setActiveTab("calendar")}>
            <CalendarDays size={14} /> Calendar
          </button>
        </div>

        {activeTab === "calendar" ? (
          <div className="calendar-mode-tabs">
            {["Day", "Week", "Month", "Year"].map((mode) => (
              <button
                key={mode}
                className={calendarMode === mode ? "active" : ""}
                onClick={() => setCalendarMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        ) : (
          <div className="calendar-toolbar-right">
            <div className="calendar-search">
              <Search size={14} />
              <input
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="calendar-filter">
              <Filter size={14} />
              <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Running">Running</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {activeTab === "calendar" && <CalendarView />}

      {activeTab === "list" && (
        <div className="calendar-sections">
          {stages.map((stage) => <TaskSection key={stage} stage={stage} />)}
        </div>
      )}

      {activeTab === "board" && (
        <div className="calendar-board">
          {stages.map((stage) => {
            const sectionTasks = filteredTasks.filter((task) => task.stage === stage);

            return (
              <div className="calendar-board-column" key={stage}>
                <div className="calendar-board-heading">
                  <h3>{stage}</h3>
                  <span>{sectionTasks.length}</span>
                  <button onClick={() => openAddModal(stage)}><Plus size={15} /></button>
                </div>

                {sectionTasks.map((task) => (
                  <div className="calendar-board-card" key={task.id}>
                    <div className="calendar-board-card-header">
                      <h4>{task.name}</h4>
                      <button onClick={() => openEditModal(task)}><Pencil size={13} /></button>
                    </div>
                    <p>{task.startDate} – {task.endDate}</p>
                    <span className={`calendar-status ${task.status.toLowerCase()}`}>{task.status}</span>
                    <select value={task.stage} onChange={(event) => changeTaskStage(task.id, event.target.value)}>
                      {stages.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="calendar-timeline">
          <h3>Task Timeline</h3>
          {filteredTasks.map((task) => (
            <div className="calendar-timeline-row" key={task.id}>
              <div className="calendar-timeline-info">
                <strong>{task.name}</strong>
                <span>{task.startDate} – {task.endDate}</span>
              </div>
              <span className={`calendar-status ${task.status.toLowerCase()}`}>{task.status}</span>
              <select value={task.stage} onChange={(event) => changeTaskStage(task.id, event.target.value)}>
                {stages.map((stage) => <option key={stage}>{stage}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="calendar-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="calendar-modal" onClick={(event) => event.stopPropagation()}>
            <div className="calendar-modal-header">
              <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
              <button onClick={() => setShowModal(false)}><X size={19} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="calendar-form-group">
                <label>Task Name</label>
                <input
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  required
                />
              </div>

              <div className="calendar-form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formatDateForInput(formData.startDate)}
                  onChange={(event) => setFormData({ ...formData, startDate: formatDateForTable(event.target.value) })}
                  required
                />
              </div>

              <div className="calendar-form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formatDateForInput(formData.endDate)}
                  onChange={(event) => setFormData({ ...formData, endDate: formatDateForTable(event.target.value) })}
                  required
                />
              </div>

              <div className="calendar-form-group">
                <label>Members</label>
                <select value={formData.members} onChange={(event) => setFormData({ ...formData, members: event.target.value })}>
                  {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                    <option key={number}>{number} Member</option>
                  ))}
                </select>
              </div>

              <div className="calendar-form-group">
                <label>Stage</label>
                <select value={formData.stage} onChange={(event) => setFormData({ ...formData, stage: event.target.value })}>
                  {stages.map((stage) => <option key={stage}>{stage}</option>)}
                </select>
              </div>

              <div className="calendar-form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                  <option>Pending</option>
                  <option>Running</option>
                  <option>Done</option>
                </select>
              </div>

              <div className="calendar-modal-actions">
                <button type="button" className="calendar-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="calendar-save-btn">{editingTask ? "Save Changes" : "Add Task"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;