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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" required />
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required />
        <br />
        <input
          type="submit"
          value="Book appointment"
          disabled={!time}
          className="SubmitButton"
        />
      </form>
    </>
  );
};
