
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <h2>ResolveIT</h2>
        <div>
          <Link to="/login/student">Student Login</Link>
          <Link to="/login/teacher">Teacher Login</Link>
          <Link to="/login/admin">Admin Login</Link>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">SMART COMPLAINT MANAGEMENT SYSTEM</p>
        <h1>Raise a Complaint.<br />Track the Resolution.</h1>
        <p>
          A simple platform for students and teachers to report issues
          and follow their progress transparently.
        </p>

        <div className="hero-buttons">
          <Link className="primary-btn" to="/register/student">
            Student Register
          </Link>
          <Link className="secondary-btn" to="/register/teacher">
            Teacher Register
          </Link>
        </div>
      </section>

      <section className="features">
        <article>
          <h3>📝 Easy Complaints</h3>
          <p>Submit issues with clear descriptions.</p>
        </article>
        <article>
          <h3>📊 Track Progress</h3>
          <p>Follow complaint status from submission to resolution.</p>
        </article>
        <article>
          <h3>🔐 Role-Based Access</h3>
          <p>Separate access for students, teachers and administrators.</p>
        </article>
      </section>

      <footer>© 2026 ResolveIT | Smart Complaint Management System</footer>
    </div>
  );
}

function AuthPage({ role, register = false }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const title = role.charAt(0).toUpperCase() + role.slice(1);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    // Admin registration is not allowed.
    if (register && role === "admin") {
      setMessage("Admin accounts can only be created by the project owner.");
      return;
    }

    // Login API will be connected after its backend endpoint is created.
    if (!register) {
      setMessage("Login API is not connected yet. We will set it up next.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed. Please try again.");
        return;
      }

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate(`/login/${role}`);
      }, 1200);
    } catch (error) {
      setMessage(
        "Could not connect to the server. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="back-link">← Back to Home</Link>

        <h1>{title} {register ? "Registration" : "Login"}</h1>

        <p>
          {register
            ? `Create your ${role} account`
            : `Sign in to your ${role} account`}
        </p>

        <form onSubmit={handleSubmit}>
          {register && (
            <label>
              Full Name
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
              />
            </label>
          )}

          <label>
            Email Address
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter password (minimum 8 characters)"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : register
                ? "Create Account"
                : "Login"}
          </button>
        </form>

        {message && (
          <p role="status" aria-live="polite">
            {message}
          </p>
        )}

        {role !== "admin" && (
          <p className="auth-switch">
            {register ? "Already registered? " : "New user? "}
            <Link to={register ? `/login/${role}` : `/register/${role}`}>
              {register ? "Login here" : "Register here"}
            </Link>
          </p>
        )}

        {role === "admin" && (
          <p className="security-note">
            Admin accounts are created by the project owner only.
          </p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/student" element={<AuthPage role="student" />} />
        <Route path="/register/student" element={<AuthPage role="student" register />} />
        <Route path="/login/teacher" element={<AuthPage role="teacher" />} />
        <Route path="/register/teacher" element={<AuthPage role="teacher" register />} />
        <Route path="/login/admin" element={<AuthPage role="admin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
