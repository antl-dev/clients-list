import { IoCheckmarkSharp, IoClose, IoTrash } from "react-icons/io5";

export const Edit = ({ data }) => {
  console.log(data);
  return (
    <section className="flex flex-col items-center gap-4 mt-0 bg-slate-200 w-screen h-screen px-2 py-10">
      <div className="bg-white w-11/12 px-10 py-6 rounded-sm shadow-lg shadow-orange-400 flex flex-col gap-4">
        <div className="flex justify-center items-center text-xl">
          <div>
            <div className="text-3xl text-gray-600">05.08.2022</div>
            <input type="time" className="input" defaultValue="00:00" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 py-6">
          <input type="text" className="input" placeholder="Имя" />
          <input type="text" className="input" placeholder="Телефон" />
          <input type="text" className="input" placeholder="Комментарий" />

          <input type="number" className="input" placeholder="Стоимость" />

          <div className="flex items-center justify-between w-10/12">
            <div className="w-4/6">Время услуги:</div>
            <input type="time" className="input mini" defaultValue="00:00" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button className="flex items-center justify-around gap-4 text-2xl px-4 py-2 rounded-full h-12 bg-green-600 text-white shadow-lg">
            <IoCheckmarkSharp />
          </button>
          <button className="flex items-center justify-around gap-4 text-2xl px-4 py-2 rounded-full h-12 bg-gray-600 text-white shadow-lg">
            <IoClose />
          </button>
          <button className="flex items-center justify-around gap-4 text-2xl px-4 py-2 rounded-full h-12 bg-red-600 text-white shadow-lg">
            <IoTrash />
          </button>
        </div>
      </div>
    </section>
  );
};
