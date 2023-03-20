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
        <h4 className="DateLabel">Select a date</h4>
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
