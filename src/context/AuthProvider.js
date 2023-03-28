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

  const [authorization, setAuthorization] = useState(
    JSON.parse(localStorage.getItem("authorization")) || null
  );

  const [isError, setIsError] = useState(false);

  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsError(false);

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
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        const authAuthorization = response.text();
        return authAuthorization;
      })
      .then((authorization) => {
        setUsername(user.username);
        setAuthorization(authorization);
        localStorage.setItem("authorization", JSON.stringify(authorization));

        localStorage.setItem("username", JSON.stringify(user.username));
        navigate("/admin");
      })
      .catch((err) => {
        console.log({ err });
        setIsError(true);
      });
  };

  const isAuthenticated = () => {
    return localStorage.getItem("username") !== null || "";
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setAuthorization(null);
    setIsError(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated(),
        username,
        authorization,
        handleLogin,
        handleLogout,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
