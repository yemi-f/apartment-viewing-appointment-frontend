import React from "react";
import "./AppointmentForm.css";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const AppointmentForm = ({ date, time, buildingId }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      buildingId,
      date,
      time,
    };

    await fetch(`${apiServerUrl}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(() => {
        e.target.reset();
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <>
      <h4 className="FormLabel">Enter your details below</h4>
      <form onSubmit={handleSubmit} className="AppointmentFormWrapper">
        <div className="AppointmentInputContainer">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="AppointmentInput"
            required
          />
        </div>
        <div className="AppointmentInputContainer">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="AppointmentInput"
            required
          />
        </div>
        <div className="AppointmentInputContainer">
          <input
            type="submit"
            value="Book appointment"
            disabled={!time}
            id="book-appointment-button"
            className="AppointmentInput"
          />
        </div>
      </form>
    </>
  );
};
