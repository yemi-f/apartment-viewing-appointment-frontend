import React from "react";
import "./AppointmentTime.css";

export const AppointmentTime = ({
  availableTimes,
  handleTimeButtonClick,
  selectedTime,
}) => {
  return (
    <div className="AppointmentTimeWrapper">
      <label>Available times</label>
      <div>
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
    </div>
  );
};
