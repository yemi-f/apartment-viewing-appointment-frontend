import React, { useEffect, useState } from "react";
import { AppointmentForm } from "./AppointmentForm";
import "./AppointmentContent.css";
import { AppointmentTime } from "./AppointmentTime";
import { AppointmentCalendar } from "./AppointmentCalendar";
import { getDateToday } from "../utils";
import { useBuildings } from "../context/BuildingsProvider";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const AppointmentContent = () => {
  const today = getDateToday();

  const { buildings } = useBuildings();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedBuildingId, setSelectedBuildingId] = useState("");
  const [selectedBuildingName, setSelectedBuildingName] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [availableTimes, setAvailableTimes] = useState([]);

  const handleBuildingSelectChange = (e) => {
    const buildingId = e.target.value;
    const buildingName = e.target.options[e.target.selectedIndex].text;

    setSelectedBuildingId(buildingId);
    setSelectedBuildingName(buildingName);
    setSelectedTime("");
  };

  const handleCalendarOnChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setSelectedTime("");
  };

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedBuildingId) {
        setAvailableTimes([]);
        return;
      }
      fetch(
        `${apiServerUrl}/buildings/${selectedBuildingId}/available?date=${selectedDate}`
      )
        .then((response) => response.json())
        .then((data) => setAvailableTimes(data));
    };

    fetchAvailableTimes();
  }, [selectedBuildingId, selectedDate]);

  const handleTimeButtonClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="AppointmentContentWrapper">
      <div>
        <div className="SelectBuildingWrapper">
          <h4 className="BuildingLabel">Choose a building</h4>
          <select
            name="buildings"
            id="buildings"
            value={selectedBuildingId}
            onChange={handleBuildingSelectChange}
          >
            <option value="">Please select a building</option>
            {buildings.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {selectedBuildingId && (
          <AppointmentCalendar
            today={today}
            selectedDate={selectedDate}
            handleCalendarOnChange={handleCalendarOnChange}
          />
        )}
      </div>

      {availableTimes.length > 0 ? (
        <AppointmentTime
          availableTimes={availableTimes}
          selectedTime={selectedTime}
          handleTimeButtonClick={handleTimeButtonClick}
        />
      ) : (
        selectedBuildingId && <p>No appointments available</p>
      )}
      {selectedTime && (
        <AppointmentForm
          time={selectedTime}
          date={selectedDate}
          buildingId={selectedBuildingId}
          buildingName={selectedBuildingName}
        />
      )}
    </div>
  );
};
