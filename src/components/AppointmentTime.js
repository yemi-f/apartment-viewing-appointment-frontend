import React from "react";
import "./AppointmentTime.css";

export const AppointmentTime = ({
  availableTimes,
  handleTimeButtonClick,
  selectedTime,
}) => {
  return (
    <div className="AppointmentTimeWrapper">
      <h4 className="TimeLabel">Select a time</h4>
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
