import { Link } from "react-router-dom";
import { IoCheckmarkSharp, IoClose, IoTrash } from "react-icons/io5";

export const Edit = () => {
  return (
    <>
      <div className="datepicker relative form-floating mb-3 xl:w-96">
        <input
          id="floatingInput"
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Select a date"
        />
        <label forhtml="floatingInput" className="text-gray-700">
          Выбрать дату
        </label>
      </div>

      <hr />

      <section className="flex flex-col items-center gap-4 mt-0 bg-slate-200 w-screen h-screen px-2 py-10">
        <div className="bg-white w-11/12 px-10 py-6 rounded-sm shadow-lg shadow-orange-400 flex flex-col gap-4">
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
            <Link
              to="/"
              className="flex items-center justify-around gap-4 text-2xl px-4 py-2 rounded-full h-12 bg-gray-600 text-white shadow-lg"
            >
              <IoClose />
            </Link>
            <button className="flex items-center justify-around gap-4 text-2xl px-4 py-2 rounded-full h-12 bg-red-600 text-white shadow-lg">
              <IoTrash />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5
                  className="text-xl font-medium leading-normal text-gray-800"
                  id="exampleModalLabel"
                >
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body relative p-4">
                Modal body text goes here.
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
