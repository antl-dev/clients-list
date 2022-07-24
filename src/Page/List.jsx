import { useState } from "react";
import { IoAdd } from "react-icons/io5";

import clsx from "clsx";
import dayjs from "dayjs";
import { useGetMonthDays } from "../hooks/useGetMonthDays";
import { Header } from "../components/Header";
import { ButtonCircle } from "../components/ButtonCircle";

export const List = () => {
  const dayjsInit = dayjs();
  const currentMonth = dayjsInit.format("M");
  const [activeMonth, setActiveMonth] = useState(currentMonth - 1);
  const monthRender = dayjs().month(activeMonth).format("MMMM");
  const monthDays = useGetMonthDays(activeMonth);

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
    <>
      <Header
        month={monthRender}
        onClick={handleMonth}
        className="flex-center-around"
      />

      <section className="flex flex-col gap-2 container mt-16">
        {monthDays?.map((day) => (
          <div
            key={day.day}
            className={clsx("row", {
              active: day.dateFull === dayjsInit.format("DD.MM.YYYY"),
            })}
          >
            <div
              onClick={() => handleDay(day)}
              className={clsx("row-date", {
                active: day.dateFull === dayjsInit.format("DD.MM.YYYY"),
              })}
            >
              <div>{day.day}</div>
              <div>{day.nameShort}</div>
            </div>

            <div className="divider" />

            <div className="flex gap-4">
              {day.client
                ?.sort((a, b) => a.hour - b.hour)
                ?.map((item) => (
                  <ButtonCircle
                    key={item.hour}
                    date={day.dateFull}
                    time={`${item.hour}:${item.minute}`}
                    onClick={handleDay}
                    target="test"
                  >
                    <div>{item.hour}</div>
                    <div>{item.minute}</div>
                  </ButtonCircle>
                ))}

              {day.client.length < 4 && (
                <ButtonCircle onClick={handleDay} target="test">
                  <IoAdd />
                </ButtonCircle>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
