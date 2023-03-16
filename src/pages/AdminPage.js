import React from "react";
import { useAuth } from "../context/AuthProvider";

export const AdminPage = () => {
  const { isAuthenticated, username } = useAuth();

  if (!isAuthenticated) {
    return <h1>You're not authorized to view this page</h1>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>You're logged in as {username}</p>
    </div>
  );
};
