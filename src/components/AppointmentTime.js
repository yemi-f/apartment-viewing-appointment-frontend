import React from "react";
import "./AppointmentTime.css";

export const AppointmentTime = ({
  availableTimes,
  handleTimeButtonClick,
  selectedTime,
}) => {
  return (
    <div className="ButtonGroup">
      <p>Available times:</p>
      {availableTimes.map((time) => (
        <button
          className={`TimeButton ${selectedTime === time ? "Selected" : ""}`}
          key={time}
          onClick={() => handleTimeButtonClick(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};
