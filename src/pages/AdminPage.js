import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { getDateToday } from "../utils";
import { useBuildings } from "../context/BuildingsProvider";
import "./AdminPage.css";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const AdminPage = () => {
  const { isAuthenticated, username, authorization } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getDateToday());
  const { buildings } = useBuildings();

  const onCalendarChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  const getBuildingName = (buildingId) => {
    for (let { id, name } of buildings) {
      if (id === buildingId) {
        return name;
      }
    }

    return "";
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      fetch(`${apiServerUrl}/appointments?date=${selectedDate}`, {
        headers: new Headers({ Authorization: authorization }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAppointments(data);
        })
        .catch((error) => console.log({ error }));
    };

    fetchAppointments();
  }, [authorization, selectedDate]);

  if (!isAuthenticated) {
    return <h1>You're not authorized to view this page</h1>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>You're logged in as {username}</p>
      <div className="AppointmentCalendarWrapper">
        <h4 className="DateLabel">Select a date</h4>
        <input
          type="date"
          id="cal"
          name="cal"
          value={selectedDate}
          onChange={onCalendarChange}
        ></input>
      </div>

      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Building</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(({ id, name, email, date, time, buildingId }) => {
              return (
                <tr key={id}>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{getBuildingName(buildingId)}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>There are no appointments for this day</p>
      )}
    </div>
  );
};
