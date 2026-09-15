import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardCheck, Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const result = signIn(email.trim(), password);

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
            <span className="eyebrow">WELCOME BACK</span>

            <h2>
              Stay organized.
              <br />
              Get things done.
            </h2>

            <p>
              Manage your academic and personal tasks from one simple
              workspace. Track progress, stay focused and complete your goals.
            </p>

            <div className="auth-feature-list">
              <div>
                <span>01</span>
                <p>Organize your tasks</p>
              </div>

              <div>
                <span>02</span>
                <p>Track your progress</p>
              </div>

              <div>
                <span>03</span>
                <p>Complete your goals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-heading">
            <span className="eyebrow">ACCOUNT</span>
            <h2>Sign In</h2>
            <p>Welcome back! Enter your details to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
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
              <LogIn size={21} />
              Sign In
            </button>
          </form>

          <div className="auth-divider">
            <span>NEW TO TASKFLOW?</span>
          </div>

          <Link to="/signup" className="auth-secondary-button">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default SignIn;