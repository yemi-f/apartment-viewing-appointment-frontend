import React from "react";

export const AppointmentCalendar = ({
  selectedDate,
  today,
  handleCalendarOnChange,
  disabled,
}) => {
  return (
    <>
      <div>
        <label htmlFor="cal">Appointment date:</label>
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
