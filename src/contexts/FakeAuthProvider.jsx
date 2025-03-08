import { createContext, useContext, useReducer } from "react";
import React from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "log_in":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "log_out":
      return { ...state, user: null, isAuthenticated: false };
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function logIn(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "log_in", payload: FAKE_USER });
  }

  function logOut() {
    dispatch({ type: "log_out" });
  }
  return (
    <AuthContext.Provider value={{ logIn, logOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
