import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("taskManagerUser");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("taskManagerUser");
      return null;
    }
  });

  const signUp = (
    name,
    email,
    password
  ) => {

    const existingAccount =
      localStorage.getItem(
        "taskManagerAccount"
      );

    if (existingAccount) {
      return {
        success: false,
        message:
          "An account already exists. Please sign in."
      };
    }

    const account = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password
    };

    localStorage.setItem(
      "taskManagerAccount",
      JSON.stringify(account)
    );

    return {
      success: true,
      message: "Account created successfully."
    };
  };

  const signIn = (
    email,
    password
  ) => {

    const savedAccount =
      localStorage.getItem(
        "taskManagerAccount"
      );

    if (!savedAccount) {
      return {
        success: false,
        message:
          "No account found. Please sign up first."
      };
    }

    let account;

    try {
      account = JSON.parse(savedAccount);
    } catch {
      return {
        success: false,
        message:
          "Account information is invalid."
      };
    }

    if (
      account.email !==
        email.trim().toLowerCase() ||
      account.password !== password
    ) {
      return {
        success: false,
        message:
          "Incorrect email or password."
      };
    }

    const loggedInUser = {
      name: account.name,
      email: account.email
    };

    localStorage.setItem(
      "taskManagerUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return {
      success: true
    };
  };

  const signOut = () => {
    localStorage.removeItem(
      "taskManagerUser"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}