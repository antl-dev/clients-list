import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

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

  const [modalVisible, setmodalVisible] = useState(false);
  const [modalSelect, setModalSelect] = useState("");

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

  const handleVisibleModal = () => {
    setmodalVisible((prev) => !prev);
  };

  const handleState = (data) => {
    handleVisibleModal();
    return;
  };

  const { isLoading, error, data } = useQuery(["clientsData"], () =>
    fetch("http://192.168.0.200:3050/clients").then((response) =>
      response.json()
    )
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
              className={clsx(
                "flex items-center gap-2 py-2 border-b border-gray-300",
                { "bg-primary": isMatching }
              )}
            >
              <div className="flex flex-col justify-center items-center min-w-[4em]  border-r border-gray-300">
                <div
                  className={clsx("text-lg text-primary", {
                    "text-accent-content": isMatching,
                  })}
                >
                  {day.nameShort}
                </div>
                <div
                  className={clsx("text-3xl text-primary-content", {
                    "text-accent": isMatching,
                  })}
                >
                  {day.day}
                </div>
              </div>

              <div className="flex items-center gap-1">
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
                      active={isMatching}
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
                  active={isMatching}
                >
                  <IoAdd />
                </ButtonCircle>
              </div>
            </div>
          );
        })}
      </div>

      <div className={clsx("modal", { "modal-open": modalVisible })}>
        <div className="modal-box">
          <div className="flex flex-col justify-center text-center">
            <h3 className="font-bold text-3xl">24.08.2022</h3>
            <h3 className="font-bold text-5xl">10:00</h3>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Имя"
              className="input input-bordered input-primary w-full input-sm"
            />
            <input
              type="text"
              placeholder="Телефон"
              className="input input-bordered input-primary w-full input-sm"
            />
            <input
              type="text"
              placeholder="Комментарий"
              className="input input-bordered input-primary w-full input-sm"
            />
            <input
              type="text"
              placeholder="Стоимость"
              className="input input-bordered input-primary w-full input-sm"
            />
            <input
              type="text"
              placeholder="Длительность"
              className="input input-bordered input-primary w-full input-sm"
            />

            <select
              className="select select-bordered select-primary w-full select-sm"
              value={modalSelect}
              onChange={(e) => setModalSelect(e.target.value)}
            >
              <option value="">Месенджер</option>
              <option value="vk">Vk</option>
              <option value="watsapp">WatsApp</option>
              <option value="sms">СМС</option>
              <option value="tg">Telegram</option>
            </select>
          </div>

          <div className="modal-action justify-center">
            <button className="btn btn-success" onClick={handleVisibleModal}>
              Сохранить
            </button>
            <button className="btn btn-warning" onClick={handleVisibleModal}>
              Отмена
            </button>
            <button className="btn btn-accent" onClick={handleVisibleModal}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
