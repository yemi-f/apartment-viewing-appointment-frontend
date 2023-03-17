import React from "react";
import "./AppointmentCalendar.css";

export const AppointmentCalendar = ({
  selectedDate,
  today,
  handleCalendarOnChange,
  disabled,
}) => {
  return (
    <>
      <div className="AppointmentCalendarWrapper">
        <label htmlFor="cal">Appointment date</label>
        <br />
        <input
          type="date"
          id="cal"
          name="cal"
          disabled={disabled}
          min={today}
          value={selectedDate}
          onChange={handleCalendarOnChange}
        ></input>
      </div>
    </>
  );
};
