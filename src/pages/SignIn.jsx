import { useState } from "react";
import {
  useNavigate,
  Link,
  useLocation
} from "react-router-dom";

import {
  LogIn,
  LockKeyhole,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  ChartNoAxesColumnIncreasing
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const successMessage =
    location.state?.message || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    const result = await signIn(
      email,
      password,
      rememberMe
    );

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/", {
      replace: true
    });
  };

  return (
    <div className="auth-page">

      {/* Decorative background */}

      <div className="auth-background-shape shape-one"></div>
      <div className="auth-background-shape shape-two"></div>
      <div className="auth-background-shape shape-three"></div>


      <div className="auth-layout">

        {/* =================================================
            LEFT BRANDING SECTION
        ================================================= */}

        <section className="auth-intro">

          <div className="intro-top">

            <div className="auth-brand">

              <div className="auth-brand-icon">
                <CheckCircle2 size={30} />
              </div>

              <div>
                <h1>TaskFlow</h1>
                <span>Task Manager</span>
              </div>

            </div>

            <div className="intro-badge">
              <Sparkles size={15} />
              <span>SMART WORKSPACE</span>
            </div>

          </div>


          <div className="intro-content">

            <span className="intro-eyebrow">
              WELCOME BACK
            </span>

            <h2>
              Stay organized.
              <br />
              <span>Get things done.</span>
            </h2>

            <p className="intro-description">
              Manage your academic and personal tasks
              from one simple workspace. Track progress,
              stay focused and complete your goals.
            </p>


            {/* FEATURES */}

            <div className="intro-features">

              <div className="intro-feature">

                <div className="feature-number">
                  01
                </div>

                <div className="feature-icon">
                  <Target size={20} />
                </div>

                <div className="feature-text">
                  <strong>
                    Organize your tasks
                  </strong>

                  <span>
                    Keep everything in one organized
                    workspace.
                  </span>
                </div>

              </div>


              <div className="intro-feature">

                <div className="feature-number">
                  02
                </div>

                <div className="feature-icon">
                  <ChartNoAxesColumnIncreasing
                    size={20}
                  />
                </div>

                <div className="feature-text">
                  <strong>
                    Track your progress
                  </strong>

                  <span>
                    See what is pending, raised and
                    completed.
                  </span>
                </div>

              </div>


              <div className="intro-feature">

                <div className="feature-number">
                  03
                </div>

                <div className="feature-icon">
                  <CheckCircle2 size={20} />
                </div>

                <div className="feature-text">
                  <strong>
                    Complete your goals
                  </strong>

                  <span>
                    Stay focused and turn plans into
                    achievements.
                  </span>
                </div>

              </div>

            </div>

          </div>


          <div className="intro-footer">
            <span>ACADEMIC</span>
            <i></i>
            <span>PERSONAL</span>
            <i></i>
            <span>PRODUCTIVE</span>
          </div>

        </section>


        {/* =================================================
            RIGHT SIGN IN SECTION
        ================================================= */}

        <section className="auth-form-section">

          <div className="auth-card">

            <div className="auth-card-header">

              <span className="eyebrow">
                WELCOME BACK
              </span>

              <h2>
                Sign in to TaskFlow
              </h2>

              <p>
                Continue where you left off and
                keep your tasks moving.
              </p>

            </div>


            {/* SUCCESS MESSAGE */}

            {successMessage && (
              <div className="message success">
                <CheckCircle2 size={18} />
                <span>{successMessage}</span>
              </div>
            )}


            {/* FORM */}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div className="auth-field">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="auth-input-wrapper">

                  <Mail size={19} />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="auth-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <LockKeyhole size={19} />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />

                </div>

              </div>


              {/* REMEMBER */}

              <label className="remember-checkbox">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span className="custom-checkbox"></span>

                <span>
                  Remember me
                </span>

              </label>


              {/* ERROR */}

              {error && (
                <div className="message error">
                  {error}
                </div>
              )}


              {/* SIGN IN BUTTON */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="auth-button-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                    <ArrowRight size={19} />
                  </>
                )}

              </button>

            </form>


            {/* CREATE ACCOUNT CTA */}

            <div className="auth-create-account">

              <div>
                <span>New to TaskFlow?</span>
                <strong>
                  Create your workspace
                </strong>
              </div>

              <Link
                to="/signup"
                className="create-account-button"
              >
                <span>Create Account</span>
                <ArrowRight size={18} />
              </Link>

            </div>


            <div className="auth-footer-note">
              <span>
                TaskFlow • Simple tasks. Better focus.
              </span>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default SignIn;