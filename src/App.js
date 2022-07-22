import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import "./App.css";

dayjs.locale("ru");

function App() {
  const dayjsInit = dayjs();
  const currentMonth = dayjsInit.format("M");

  const [activeMonth, setActiveMonth] = useState(currentMonth - 1);

  const monthRender = dayjs().month(activeMonth).format("MMMM");

  const getMonthDays = (month) => {
    const temp = new Array(dayjs().month(month).daysInMonth())
      .fill(dayjs().month(month).startOf("month"))
      .map((day, idx) => {
        const temp = day.add(idx, "day");
        return {
          day: temp.format("D"),
          dateFull: temp.format("DD.MM.YYYY"),
          month: temp.format("MM"),
          monthText: temp.format("MMMM"),
          nameShort: temp.format("dd"),
          nameFull: temp.format("dddd"),
        };
      });
    return temp;
  };

  const monthDays = getMonthDays(activeMonth);

  const handleMonth = (action) => {
    switch (action) {
      case "prev":
        setActiveMonth((prev) => (prev !== 0 ? prev - 1 : 11));
        break;
      case "next":
        setActiveMonth((prev) => (prev !== 11 ? prev + 1 : 0));
        break;

      default:
        break;
    }
  };

  const handleDay = (day) => {
    console.log(day);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={() => handleMonth("prev")}>-</button>
          <span>{monthRender}</span>
          <button onClick={() => handleMonth("next")}>+</button>
        </div>
        <div>
          {monthDays?.map((day) => (
            <div key={day.day} onClick={() => handleDay(day)}>
              {day.day} - {day.nameShort}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
