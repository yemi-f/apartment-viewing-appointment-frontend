import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const AdminPage = () => {
  const { isAuthenticated, username, authorization } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      fetch(`${apiServerUrl}/appointments`, {
        headers: new Headers({ Authorization: authorization }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAppointments(data);
        })
        .catch((error) => console.log({ error }));
    };

    fetchAppointments();
  }, [authorization]);

  if (!isAuthenticated) {
    return <h1>You're not authorized to view this page</h1>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>You're logged in as {username}</p>
      {appointments.map(({ id, name, email, date, time }) => (
        <p key={id}>
          {name} {email} {date} {time}
        </p>
      ))}
    </div>
  );
};
