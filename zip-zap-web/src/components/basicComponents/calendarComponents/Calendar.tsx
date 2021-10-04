import React from "react";
import {
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
} from "date-fns";

const daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header calendar-row flex-middle">
        {/* <div className="calendar-col calendar-col-start">
        </div> */}
        <div className="col col-center">
          <h2>{format(this.state.currentMonth, dateFormat)}</h2>
        </div>
        {/* <div className="calendar-col calendar-col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div> */}
      </div>
    );
  }

  renderDays() {
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-col calendar-col-center" key={i}>
          {" "}
          {daysOfTheWeek[i]}{" "}
        </div>
      );
    }

    return <div className="calendar-days calendar-row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <div
            className={`calendar-col calendar-cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={formattedDate}
          >
            <span className="calendar-number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="calendar-row" key={`row-${formattedDate}`}>{days}</div>);
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  }

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
