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
      <Box className="calendarHeader calendarRow">
        <Box className="calendarCol calendarCol-start"></Box>
        <Box className="calendarCol calendarCol-center">
          <Typography variant="body" sx={{ fontSize: "20px", fontWeight: 600 }}>
            {format(currentMonth, dateFormat)}
          </Typography>
        </Box>
        <Box className="calendarCol calendarCol-end"></Box>
      </Box>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <Box className="calendarCol calendarCol-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Box>
      );
    }
    return <Box className="days calendarRow">{days}</Box>;
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
            className={`calendarCol cell ${
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
        <Box className="calendarRow" key={day}>
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
