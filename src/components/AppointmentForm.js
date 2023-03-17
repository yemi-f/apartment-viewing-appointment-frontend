import React from "react";
import "./AppointmentForm.css";

export const AppointmentForm = ({ date, time, buildingId }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      buildingId,
      date,
      time,
    };

    console.log(body);
  };

  return (
    <>
      <h3>This is a form</h3>
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
