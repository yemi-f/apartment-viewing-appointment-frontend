import React from "react";
import { useLocation } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import "./AppointmentSuccessPage.css";

export const AppointmentSuccessPage = () => {
  let location = useLocation();

  if (!location.state) {
    return <NotFoundPage />;
  }

  const { date, time, buildingName } = location.state;

  return (
    <div className="AppointmentSuccessWrapper">
      <h3>&#x2705;</h3>
      <span>
        Your appointment with {buildingName} at {time} on {date} is scheduled
      </span>
    </div>
  );
};
