import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import "./LoginPage.css";

export const LoginPage = () => {
  const { handleLogin, isError } = useAuth();
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  useEffect(() => {
    if (isError) {
      setShowErrorMsg(true);

      setTimeout(function () {
        setShowErrorMsg(false);
      }, 3000);
    }
  }, [isError]);

  return (
    <div className="LoginContainer">
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
        {showErrorMsg && <p>&#x274C; Invalid username and/or password.</p>}
      </form>
    </div>
  );
};
