import React from "react";
import { useAuth } from "../context/AuthProvider";
import "./LoginPage.css";

export const LoginPage = () => {
  const { handleLogin } = useAuth();

  return (
    <div className="LoginContainer">
      <h1>Login</h1>
      <form className="FormContainer" onSubmit={handleLogin}>
        <div className="InputContainer">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="LoginInput"
            required
          />
        </div>
        <div className="InputContainer">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="LoginInput"
            required
          />
        </div>
        <div className="InputContainer">
          <input
            type="submit"
            value="Login"
            id="login-button"
            className="LoginInput"
          />
        </div>
      </form>
    </div>
  );
};
