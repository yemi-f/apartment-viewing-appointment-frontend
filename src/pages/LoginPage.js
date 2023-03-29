import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import "./LoginPage.css";

export const LoginPage = () => {
  const { handleLogin } = useAuth();
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onSubmit = (e) => {
    handleLogin(e).catch(() => {
      setShowErrorMsg(true);
      setTimeout(function () {
        setShowErrorMsg(false);
      }, 3000);
    });
  };

  return (
    <div className="LoginContainer">
      <form className="FormContainer" onSubmit={onSubmit}>
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
        {showErrorMsg && <p>&#x274C; Invalid username and/or password.</p>}
      </form>
    </div>
  );
};
