import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  LockKeyhole,
  UserPlus,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  ChartNoAxesColumnIncreasing
} from "lucide-react";

import {
  useAuth,
  getPasswordStrength
} from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const passwordStrength =
    getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = await signUp(
      username,
      email,
      password,
      confirmPassword,
      rememberMe
    );

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/signin", {
      replace: true,
      state: {
        message:
          "Account created successfully! Please sign in."
      }
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
              <span>YOUR WORKSPACE</span>
            </div>

          </div>


          <div className="intro-content">

            <span className="intro-eyebrow">
              START SOMETHING GREAT
            </span>

            <h2>
              Stay organized.
              <br />
              <span>Get things done.</span>
            </h2>

            <p className="intro-description">
              Create one simple workspace for your
              academic and personal tasks. Plan your
              work, track your progress and accomplish
              your goals with TaskFlow.
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
                    Turn your daily workload into
                    clear actionable tasks.
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
                    Keep an eye on your work and
                    stay focused.
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
                    Finish important tasks and
                    celebrate your progress.
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
            RIGHT SIGN UP SECTION
        ================================================= */}

        <section className="auth-form-section">

          <div className="auth-card">

            <div className="auth-card-header">

              <span className="eyebrow">
                GET STARTED
              </span>

              <h2>
                Create your account
              </h2>

              <p>
                Set up your TaskFlow workspace and
                start organizing your day.
              </p>

            </div>


            {/* FORM */}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* USERNAME */}

              <div className="auth-field">

                <label htmlFor="username">
                  Username
                </label>

                <div className="auth-input-wrapper">

                  <User size={19} />

                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    autoComplete="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="auth-field">

                <label htmlFor="signup-email">
                  Email Address
                </label>

                <div className="auth-input-wrapper">

                  <Mail size={19} />

                  <input
                    id="signup-email"
                    type="email"
                    placeholder="example@gmail.com"
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

                <label htmlFor="signup-password">
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <LockKeyhole size={19} />

                  <input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />

                </div>


                {password && (
                  <div className="password-strength">

                    <div className="strength-top">

                      <span>
                        Password strength
                      </span>

                      <strong
                        className={
                          passwordStrength.className
                        }
                      >
                        {passwordStrength.label}
                      </strong>

                    </div>


                    <div className="strength-bars">

                      {[1, 2, 3, 4, 5].map(
                        (number) => (
                          <span
                            key={number}
                            className={
                              number <=
                              passwordStrength.score
                                ? `strength-active ${passwordStrength.className}`
                                : ""
                            }
                          ></span>
                        )
                      )}

                    </div>


                    <small>
                      Use 8+ characters with uppercase,
                      numbers and symbols for a strong
                      password.
                    </small>

                  </div>
                )}

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="auth-field">

                <label htmlFor="confirm-password">
                  Confirm Password
                </label>

                <div className="auth-input-wrapper">

                  <LockKeyhole size={19} />

                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    autoComplete="new-password"
                    onChange={(e) => {
                      setConfirmPassword(
                        e.target.value
                      );
                      setError("");
                    }}
                  />

                </div>


                {confirmPassword &&
                  password === confirmPassword && (
                    <span className="password-match">
                      ✓ Passwords match
                    </span>
                  )}


                {confirmPassword &&
                  password !== confirmPassword && (
                    <span className="password-mismatch">
                      ✕ Passwords do not match
                    </span>
                  )}

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


              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="auth-button-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                    <ArrowRight size={19} />
                  </>
                )}

              </button>

            </form>


            {/* SIGN IN CTA */}

            <div className="auth-create-account">

              <div>
                <span>Already have an account?</span>
                <strong>
                  Welcome back to TaskFlow
                </strong>
              </div>

              <Link
                to="/signin"
                className="create-account-button"
              >
                <span>Sign In</span>
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

export default SignUp;