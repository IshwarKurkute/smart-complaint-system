import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Resolve<span>IT</span></h2>
        <p className="menu-title">MAIN MENU</p>

        <a className="active" href="#dashboard">Dashboard</a>
        <a href="#complaints">My Complaints</a>
        <a href="#new">New Complaint</a>
        <a href="#profile">My Profile</a>
      </aside>

      <main className="main" id="dashboard">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Manage and track your complaints</p>
          </div>
          <div className="avatar">S</div>
        </header>

        <section className="welcome">
          <div>
            <p>STUDENT PORTAL</p>
            <h2>Welcome back!</h2>
            <p>Submit complaints and track their progress easily.</p>
          </div>
          <button onClick={() => alert("Complaint form coming next!")}>
            + New Complaint
          </button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <p>Total Complaints</p>
            <h2>12</h2>
          </div>
          <div className="stat-card">
            <p>Pending</p>
            <h2>4</h2>
          </div>
          <div className="stat-card">
            <p>In Progress</p>
            <h2>3</h2>
          </div>
          <div className="stat-card">
            <p>Resolved</p>
            <h2>5</h2>
          </div>
        </section>

        <section className="panel" id="complaints">
          <h2>Recent Complaints</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#CMP-1001</td>
                  <td>Classroom fan not working</td>
                  <td>Electrical</td>
                  <td><span className="badge pending">Pending</span></td>
                </tr>
                <tr>
                  <td>#CMP-1002</td>
                  <td>Water leakage</td>
                  <td>Plumbing</td>
                  <td><span className="badge progress">In Progress</span></td>
                </tr>
                <tr>
                  <td>#CMP-1003</td>
                  <td>Classroom cleaning</td>
                  <td>Cleaning</td>
                  <td><span className="badge resolved">Resolved</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;