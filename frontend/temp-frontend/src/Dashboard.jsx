import { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [complaints, setComplaints] = useState([
    {
      id: "CMP-1001",
      title: "Classroom fan not working",
      category: "Electrical",
      location: "Room 204",
      date: "23 Oct 2026",
      status: "Pending",
      description: "The classroom fan is not working."
    },
    {
      id: "CMP-1002",
      title: "Water leakage",
      category: "Water",
      location: "Washroom",
      date: "22 Oct 2026",
      status: "In Progress",
      description: "Water is leaking near the washroom."
    },
    {
      id: "CMP-1003",
      title: "Classroom cleaning",
      category: "Cleaning",
      location: "Room 101",
      date: "21 Oct 2026",
      status: "Resolved",
      description: "Classroom cleaning was required."
    }
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const visibleComplaints = complaints.filter(c =>
    filter === "All" || c.status === filter
  );

  function submitComplaint(e) {
    e.preventDefault();

    const newComplaint = {
      id: `CMP-${1001 + complaints.length}`,
      title,
      category,
      location,
      description,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
      status: "Pending"
    };

    setComplaints(previous => [newComplaint, ...previous]);
    setTitle("");
    setCategory("");
    setLocation("");
    setDescription("");
    setShowForm(false);
    setFilter("All");
    setMessage("Complaint submitted successfully!");
  }

  function updateStatus(id, status) {
    setComplaints(previous =>
      previous.map(c => c.id === id ? { ...c, status } : c)
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="brand">Resolve<span>IT</span></h2>
        <p className="menu-title">MAIN MENU</p>

        <a className="active" href="#dashboard">▦ Dashboard</a>
        <a href="#complaints">▤ My Complaints</a>
        <a href="#new" onClick={e => {
          e.preventDefault();
          setShowForm(true);
          setMessage("");
        }}>＋ New Complaint</a>
        <a href="#profile" onClick={e => {
          e.preventDefault();
          setMessage("Profile feature will be added later.");
        }}>♙ My Profile</a>

        <div className="sidebar-bottom">
          <p>Smart Complaint System</p>
          <small>Version 1.0</small>
        </div>
      </aside>

      <main className="main" id="dashboard">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Manage and track your complaints</p>
          </div>
          <div className="user">
            <div className="avatar">S</div>
            <div>
              <strong>Student User</strong>
              <p>Student</p>
            </div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">STUDENT PORTAL</p>
            <h2>Welcome back!</h2>
            <p>Submit complaints and track their progress easily.</p>
          </div>
          <button onClick={() => {
            setShowForm(true);
            setMessage("");
          }}>
            + New Complaint
          </button>
        </section>

        {message && (
          <div className="notice" role="status">
            {message}
            <button className="notice-close" onClick={() => setMessage("")}>
              ×
            </button>
          </div>
        )}

        {showForm && (
          <section className="panel form-panel" id="new">
            <div className="panel-heading">
              <div>
                <h2>Submit New Complaint</h2>
                <p>Provide details about the issue.</p>
              </div>
              <button className="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>

            <form onSubmit={submitComplaint}>
              <label htmlFor="complaintTitle">Complaint Title</label>
              <input
                id="complaintTitle"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Classroom fan not working"
                required
                maxLength={100}
              />

              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Water">Water</option>
                <option value="Classroom">Classroom</option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="location">Location / Room Number</label>
              <input
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Room 204"
                required
                maxLength={100}
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the issue in detail"
                rows={4}
                required
                maxLength={1000}
              />

              <div className="form-actions">
                <button type="submit">Submit Complaint</button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="stats">
          <div className="stat-card">
            <div className="stat-top"><span>Total Complaints</span><span>▤</span></div>
            <h2>{total}</h2>
            <p>All submitted complaints</p>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span>Pending</span><span>◷</span></div>
            <h2>{pending}</h2>
            <p>Waiting for action</p>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span>In Progress</span><span>⟳</span></div>
            <h2>{inProgress}</h2>
            <p>Currently being handled</p>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span>Resolved</span><span>✓</span></div>
            <h2>{resolved}</h2>
            <p>Successfully resolved</p>
          </div>
        </section>

        <section className="panel" id="complaints">
          <div className="panel-heading">
            <div>
              <h2>Recent Complaints</h2>
              <p>View and track your submitted complaints.</p>
            </div>
            <select
              className="filter-select"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              aria-label="Filter complaints by status"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleComplaints.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>
                      <strong>{c.title}</strong>
                      <div className="subtext">{c.location}</div>
                    </td>
                    <td>{c.category}</td>
                    <td>{c.date}</td>
                    <td>
                      <span className={`badge ${
                        c.status === "Pending" ? "pending" :
                        c.status === "In Progress" ? "progress" : "resolved"
                      }`}>
                        {c.status}
                      </span>
                      <select
                        className="status-select"
                        aria-label={`Update status for ${c.id}`}
                        value={c.status}
                        onChange={e => updateStatus(c.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {visibleComplaints.length === 0 && (
                  <tr>
                    <td colSpan="5">No complaints found for this status.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="demo-note">
            Demo mode: complaint data is stored temporarily in this page.
          </p>
        </section>

        <footer>
          © 2026 ResolveIT · Smart Complaint Management System
        </footer>
      </main>
    </div>
  );
}

export default App;
