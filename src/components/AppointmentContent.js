import React, { useEffect, useState } from "react";
import { AppointmentForm } from "./AppointmentForm";
import "./AppointmentContent.css";
import { AppointmentTime } from "./AppointmentTime";
import { AppointmentCalendar } from "./AppointmentCalendar";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const AppointmentContent = () => {
  const dateToday = new Date();
  const month =
    dateToday.getMonth() < 9
      ? `0${dateToday.getMonth() + 1}`
      : `${dateToday.getMonth() + 1}`;
  const today = `${dateToday.getFullYear()}-${month}-${dateToday.getDate()}`;
  const [selectedDate, setSelectedDate] = useState(today);
  const [buildings, setBuildings] = useState([]);
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
    console.log(newDate);
    setSelectedDate(newDate);
    setSelectedTime("");
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      fetch(`${apiServerUrl}/buildings`)
        .then((response) => response.json())
        .then((data) => setBuildings(data));
    };

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

    fetchBuildings();
    fetchAvailableTimes();
  }, [selectedBuildingId, selectedDate]);

  const handleTimeButtonClick = (time) => {
    console.log(time);
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
            disabled={availableTimes.length < 1}
            today={today}
            selectedDate={selectedDate}
            handleCalendarOnChange={handleCalendarOnChange}
          />
        )}
      </div>

      {availableTimes.length > 0 && (
        <AppointmentTime
          availableTimes={availableTimes}
          selectedTime={selectedTime}
          handleTimeButtonClick={handleTimeButtonClick}
        />
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
