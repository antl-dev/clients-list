import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

import clsx from "clsx";
import dayjs from "dayjs";
import { useGetMonthDays } from "../hooks/useGetMonthDays";
import { Header } from "../components/Header";
import { ButtonCircle } from "../components/ButtonCircle";

export const Calendar = ({ handle }) => {
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

  const handleState = (data) => {
    // console.log(data);
  };

  const { isLoading, error, data } = useQuery(["clientsData"], () =>
    fetch("http://localhost:8000/clients").then((response) => response.json())
  );

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <>
      <Header
        month={monthRender}
        onClick={handleMonth}
        className="flex-center-around"
      />

      <section className="flex flex-col gap-2 container mt-16">
        {monthDays?.map((day) => {
          const isMatching = day.dateFull === dayjsInit.format("DD.MM.YYYY");

          return (
            <div
              key={day.day}
              className={clsx("row", {
                active: isMatching,
              })}
            >
              <div
                className={clsx("row-date", {
                  active: isMatching,
                })}
              >
                <div>{day.day}</div>
                <div>{day.nameShort}</div>
              </div>

              <div className="flex gap-3 items-center overflow-auto">
                {data
                  ?.filter(
                    (client) =>
                      dayjs(client.date).format("DD.MM.YYYY") === day.dateFull
                  )
                  ?.sort(
                    (a, b) =>
                      dayjs(a.date).format("HHmm") -
                      dayjs(b.date).format("HHmm")
                  )
                  ?.map((item) => (
                    <ButtonCircle
                      key={item.date}
                      onClick={() => handleState(item)}
                    >
                      <div>{dayjs(item.date).format("HH")}</div>
                      <div>{dayjs(item.date).format("mm")}</div>
                    </ButtonCircle>
                  ))}

                <ButtonCircle className="mini" onClick={() => handleState()}>
                  <IoAdd />
                </ButtonCircle>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
