import { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
} from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./style.css";

const GiftCalendar = ({ showDetailsHandle }) => {
  const currentMonth = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <Box className="header row flex-middle">
        <Box className="col col-start"></Box>
        <Box className="col col-center">
          <Typography variant="body" sx={{ fontSize: "20px", fontWeight: 600 }}>
            {format(currentMonth, dateFormat)}
          </Typography>
        </Box>
        <Box className="col col-end"></Box>
      </Box>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <Box className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Box>
      );
    }
    return <Box className="days row">{days}</Box>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 30; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <Box
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <Typography variant="body" className="number">
              {formattedDate}
            </Typography>
            <Typography variant="body" className="bg">
              {formattedDate}
            </Typography>
          </Box>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <Box className="row" key={day}>
          {days}
        </Box>
      );
      days = [];
    }
    return <Box className="body">{rows}</Box>;
  };
  return (
    <Box className="calendarContainer">
      <Box className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </Box>
    </Box>
  );
};

export default GiftCalendar;
