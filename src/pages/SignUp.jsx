import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ClipboardCheck,
  User,
  Mail,
  Lock,
  UserPlus
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signUp(
      name.trim(),
      email.trim(),
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-background-shape shape-one"></div>
      <div className="auth-background-shape shape-two"></div>

      <div className="auth-layout">

        <div className="auth-intro">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <ClipboardCheck size={34} />
            </div>

            <div>
              <h1>TaskFlow</h1>
              <span>Task Manager</span>
            </div>
          </div>

          <div className="auth-intro-content">
            <span className="eyebrow">START ORGANIZING</span>

            <h2>
              Your tasks.
              <br />
              Your progress.
            </h2>

            <p>
              Create your TaskFlow account and bring your academic and
              personal tasks together in one organized workspace.
            </p>

            <div className="auth-feature-list">
              <div>
                <span>01</span>
                <p>Create and manage tasks</p>
              </div>

              <div>
                <span>02</span>
                <p>Set priorities and categories</p>
              </div>

              <div>
                <span>03</span>
                <p>Track completed work</p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card signup-card">
          <div className="auth-card-heading">
            <span className="eyebrow">GET STARTED</span>
            <h2>Create Account</h2>
            <p>Set up your account and start managing your tasks.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="auth-input-group">
              <label>Full Name</label>

              <div className="auth-input-wrapper">
                <User size={20} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Email Address</label>

              <div className="auth-input-wrapper">
                <Mail size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Password</label>

              <div className="auth-input-wrapper">
                <Lock size={20} />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Confirm Password</label>

              <div className="auth-input-wrapper">
                <Lock size={20} />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button type="submit" className="auth-submit-button">
              <UserPlus size={21} />
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>ALREADY HAVE AN ACCOUNT?</span>
          </div>

          <Link to="/signin" className="auth-secondary-button">
            Sign In Instead
          </Link>
        </div>

      </div>
    </div>
  );
}

export default SignUp;