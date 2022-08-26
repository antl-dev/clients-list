import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import dayjs from "dayjs";

import { Header } from "../components/Header";
import { ButtonCircle } from "../components/ButtonCircle";

import { useGetMonthDays } from "../hooks/useGetMonthDays";
import {
  IoAdd,
  IoCloseSharp,
  IoPencilSharp,
  IoSave,
  IoTrash,
} from "react-icons/io5";

export const Calendar = () => {
  const dayjsInit = dayjs();
  const currentMonth = dayjsInit.format("M");
  const [activeMonth, setActiveMonth] = useState(currentMonth - 1);
  const monthRender = dayjs().month(activeMonth).format("MMMM");
  const monthDays = useGetMonthDays(activeMonth);

  const currentRowRef = useRef();

  const [modalVisible, setmodalVisible] = useState(false);
  const [modalSelect, setModalSelect] = useState("vk");
  const [modalTimeEdit, setModalTimeEdit] = useState(false);

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

  const { isLoading, error, data, isSuccess } = useQuery(["clientsData"], () =>
    fetch("http://192.168.0.200:3050/clients").then((response) =>
      response.json()
    )
  );

  const executeScroll = () => currentRowRef.current.scrollIntoView();

  useEffect(() => {
    if (isSuccess) {
      executeScroll();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!modalVisible) {
      document.body.style.position = "";
    } else {
      document.body.style.position = "fixed";
    }
  }, [modalVisible]);

  const handleHoursState = () => {
    setModalTimeEdit((prev) => !prev);
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div className="no-scrollbar overflow-y-auto">
      <Header month={monthRender} onClick={handleMonth} />

      <div className="my-4 border-t">
        {monthDays?.map((day) => {
          const isMatching = day.dateFull === dayjsInit.format("DD.MM.YYYY");

          return (
            <div
              key={day.day}
              ref={isMatching ? currentRowRef : null}
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

      <div
        className={clsx("modal", {
          "modal-open": modalVisible,
        })}
      >
        <div className="modal-box">
          <div className="navbar items-start">
            <div className="navbar-start" />
            <div className="flex flex-col justify-center text-center mb-2 navbar-center">
              <div className="text-primary font-bold text-xl">24.08.2022</div>

              {modalTimeEdit ? (
                <div className="relative">
                  <input
                    type="time"
                    placeholder="Type here"
                    className="input input-bordered input-primary"
                  />
                  <button
                    onClick={handleHoursState}
                    className="btn btn-ghost absolute -right-14 text-xl"
                  >
                    <IoSave />
                  </button>
                </div>
              ) : (
                <div className="text-primary-content font-bold text-5xl relative">
                  10:00
                  <button
                    onClick={handleHoursState}
                    className="btn btn-ghost text-xl absolute -right-14"
                  >
                    <IoPencilSharp />
                  </button>
                </div>
              )}
            </div>

            <div className="navbar-end">
              <button
                className="btn btn-accent btn-ghost gap-2 text-2xl"
                onClick={handleVisibleModal}
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center max-w-sm mx-auto">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Имя</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Телефон</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Комментарий</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Стоимость</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Длительность</span>
              </label>
              <input
                type="time"
                placeholder="Type here"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Месенджер</span>
              </label>
              <select
                className="select select-bordered select-primary select-md"
                value={modalSelect}
                onChange={(e) => setModalSelect(e.target.value)}
              >
                <option value="vk">Вконтакте</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="sms">СМС</option>
                <option value="tg">Telegram</option>
                <option value="phone">Телефон</option>
              </select>
            </div>
          </div>

          <div className="modal-action justify-center flex-wrap">
            <button
              className="btn btn-primary btn-wide items-center gap-2 text-xl"
              onClick={handleVisibleModal}
            >
              <IoSave />
              Записать
            </button>

            <button
              className="btn btn-accent items-center gap-2 text-xl"
              onClick={handleVisibleModal}
            >
              <IoTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
