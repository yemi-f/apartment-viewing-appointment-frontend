import React from "react";
import { useAuth } from "../context/AuthProvider";

export const LoginPage = () => {
  const { handleLogin } = useAuth();
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Email: </label>
        <input type="text" id="username" name="username" required />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" required />
        <br />
        <input type="submit" value="Login" className="LoginButton" />
      </form>
    </div>
  );
};
