import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")) || null
  );

  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    };

    fetch(`${apiServerUrl}/login`, {
      headers: new Headers({
        Authorization: `Basic ${Buffer.from(
          `${user.username}:${user.password}`
        ).toString("base64")}`,
      }),
    })
      .then((response) => response.text())
      .then(() => {
        setUsername(user.username);
        localStorage.setItem("username", JSON.stringify(user.username));
        navigate("/admin");
      })
      .catch((err) => console.log({ err }));
  };

  const isAuthenticated = () => {
    return localStorage.getItem("username") !== null || "";
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated(),
        username,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
