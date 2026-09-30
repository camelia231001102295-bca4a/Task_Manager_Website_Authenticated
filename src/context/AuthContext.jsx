import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "taskflow_users";
const AUTH_KEY = "taskflow_auth";
const SESSION_KEY = "taskflow_session";

/* -------------------------------------------------------
   VALID EMAIL
------------------------------------------------------- */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/* -------------------------------------------------------
   JWT TOKEN SIMULATION
------------------------------------------------------- */

function createFakeJWT(user) {
  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT"
    })
  );

  const payload = btoa(
    JSON.stringify({
      userId: user.id,
      username: user.username,
      email: user.email,
      iat: Date.now()
    })
  );

  const signature = btoa(
    "taskflow-demo-signature-" + user.id
  );

  return `${header}.${payload}.${signature}`;
}

/* -------------------------------------------------------
   PASSWORD STRENGTH
------------------------------------------------------- */

export function getPasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      label: "",
      className: ""
    };
  }

  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      score,
      label: "Weak",
      className: "strength-weak"
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Medium",
      className: "strength-medium"
    };
  }

  return {
    score,
    label: "Strong",
    className: "strength-strong"
  };
}

/* -------------------------------------------------------
   AUTH PROVIDER
------------------------------------------------------- */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -----------------------------------------------------
     RESTORE LOGIN AFTER REFRESH
  ----------------------------------------------------- */

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      const savedSession = sessionStorage.getItem(SESSION_KEY);

      if (savedAuth) {
        const authData = JSON.parse(savedAuth);

        if (authData.user && authData.token) {
          setUser(authData.user);
          setLoading(false);
          return;
        }
      }

      if (savedSession) {
        const sessionData = JSON.parse(savedSession);

        if (sessionData.user && sessionData.token) {
          setUser(sessionData.user);
          setLoading(false);
          return;
        }
      }

      setUser(null);
    } catch (error) {
      console.error(
        "Authentication restore error:",
        error
      );

      localStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(SESSION_KEY);

      setUser(null);
    }

    setLoading(false);
  }, []);

  /* -----------------------------------------------------
     SIGN UP
  ----------------------------------------------------- */

  const signUp = async (
    username,
    email,
    password,
    confirmPassword,
    rememberMe = true
  ) => {
    try {
      username = username.trim();
      email = email.trim().toLowerCase();

      /* USERNAME REQUIRED */

      if (!username) {
        return {
          success: false,
          message: "Username is required."
        };
      }

      if (username.length < 3) {
        return {
          success: false,
          message:
            "Username must be at least 3 characters."
        };
      }

      /* EMAIL REQUIRED */

      if (!email) {
        return {
          success: false,
          message: "Email is required."
        };
      }

      /* VALID EMAIL */

      if (!isValidEmail(email)) {
        return {
          success: false,
          message:
            "Please enter a valid email address."
        };
      }

      /* PASSWORD REQUIRED */

      if (!password) {
        return {
          success: false,
          message: "Password is required."
        };
      }

      /* MINIMUM PASSWORD */

      if (password.length < 6) {
        return {
          success: false,
          message:
            "Password must be at least 6 characters."
        };
      }

      /* CONFIRM PASSWORD */

      if (!confirmPassword) {
        return {
          success: false,
          message:
            "Please confirm your password."
        };
      }

      if (password !== confirmPassword) {
        return {
          success: false,
          message: "Passwords do not match."
        };
      }

      /* GET USERS */

      const existingUsers =
        JSON.parse(
          localStorage.getItem(USERS_KEY)
        ) || [];

      /* DUPLICATE EMAIL */

      const emailExists = existingUsers.some(
        (existingUser) =>
          existingUser.email.toLowerCase() === email
      );

      if (emailExists) {
        return {
          success: false,
          message:
            "An account already exists with this email."
        };
      }

      /* DUPLICATE USERNAME */

      const usernameExists = existingUsers.some(
        (existingUser) =>
          existingUser.username.toLowerCase() ===
          username.toLowerCase()
      );

      if (usernameExists) {
        return {
          success: false,
          message:
            "This username is already taken."
        };
      }

      /* CREATE USER */

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password
      };

      /* SAVE USER */

      existingUsers.push(newUser);

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(existingUsers)
      );

      /*
        IMPORTANT:
        Signup does NOT log the user in.

        We intentionally do NOT:
        - setUser()
        - create authentication session
        - save auth token
      */

      return {
        success: true,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      };
    } catch (error) {
      console.error("Signup error:", error);

      return {
        success: false,
        message:
          "Unable to create account. Please try again."
      };
    }
  };

  /* -----------------------------------------------------
     SIGN IN
  ----------------------------------------------------- */

  const signIn = async (
    email,
    password,
    rememberMe = true
  ) => {
    try {
      email = email.trim().toLowerCase();

      /* EMAIL REQUIRED */

      if (!email) {
        return {
          success: false,
          message: "Email is required."
        };
      }

      /* VALID EMAIL */

      if (!isValidEmail(email)) {
        return {
          success: false,
          message:
            "Please enter a valid email address."
        };
      }

      /* PASSWORD REQUIRED */

      if (!password) {
        return {
          success: false,
          message: "Password is required."
        };
      }

      /* GET USERS */

      const existingUsers =
        JSON.parse(
          localStorage.getItem(USERS_KEY)
        ) || [];

      /* FIND USER */

      const foundUser = existingUsers.find(
        (existingUser) =>
          existingUser.email.toLowerCase() === email &&
          existingUser.password === password
      );

      /* INVALID LOGIN */

      if (!foundUser) {
        return {
          success: false,
          message: "Invalid email or password."
        };
      }

      /* SAFE USER */

      const safeUser = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      };

      /* CREATE JWT SIMULATION */

      const token = createFakeJWT(safeUser);

      /* AUTH DATA */

      const authData = {
        user: safeUser,
        token,
        loginTime: Date.now(),
        rememberMe
      };

      /* REMEMBER USER */

      if (rememberMe) {
        localStorage.setItem(
          AUTH_KEY,
          JSON.stringify(authData)
        );

        sessionStorage.removeItem(SESSION_KEY);
      } else {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify(authData)
        );

        localStorage.removeItem(AUTH_KEY);
      }

      setUser(safeUser);

      return {
        success: true,
        user: safeUser,
        token
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message:
          "Unable to sign in. Please try again."
      };
    }
  };

  /* -----------------------------------------------------
     SIGN OUT
  ----------------------------------------------------- */

  const signOut = () => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(SESSION_KEY);

    setUser(null);
  };

  /* -----------------------------------------------------
     CONTEXT VALUE
  ----------------------------------------------------- */

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* -------------------------------------------------------
   USE AUTH
------------------------------------------------------- */

export function useAuth() {
  return useContext(AuthContext);
}