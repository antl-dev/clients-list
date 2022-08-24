import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import clsx from "clsx";
import dayjs from "dayjs";

import { Header } from "../components/Header";
import { ButtonCircle } from "../components/ButtonCircle";

import { useGetMonthDays } from "../hooks/useGetMonthDays";
import { IoAdd } from "react-icons/io5";

export const Calendar = () => {
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
    fetch("http://localhost:3050/clients").then((response) => response.json())
  );

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <>
      <Header month={monthRender} onClick={handleMonth} />

      <div className="my-4 border-t">
        {monthDays?.map((day) => {
          const isMatching = day.dateFull === dayjsInit.format("DD.MM.YYYY");

          return (
            <div
              key={day.day}
              className="flex items-center gap-2 border-b border-gray-300"
            >
              <div className="flex flex-col justify-center items-center min-w-[4em]  border-r border-gray-300">
                <div className="text-xs text-primary">{day.nameShort}</div>
                <div className="text-3xl text-primary-content">{day.day}</div>
              </div>
              {data
                ?.filter(
                  (client) =>
                    dayjs(client.date).format("DD.MM.YYYY") === day.dateFull
                )
                ?.sort(
                  (a, b) =>
                    dayjs(a.date).format("HHmm") - dayjs(b.date).format("HHmm")
                )
                ?.map((item) => (
                  <ButtonCircle
                    key={item.date}
                    onClick={() => handleState(item)}
                  >
                    <div className="flex flex-col">
                      <div>{dayjs(item.date).format("HH")}</div>
                      <div>{dayjs(item.date).format("mm")}</div>
                    </div>
                  </ButtonCircle>
                ))}
              <ButtonCircle
                className="btn-sm mx-2"
                onClick={() => handleState()}
              >
                <IoAdd />
              </ButtonCircle>
            </div>
          );
        })}
      </div>
    </>
  );
};
