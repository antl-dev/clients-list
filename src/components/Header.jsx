import { IoChevronBack, IoChevronForward, IoMenu } from "react-icons/io5";
export const Header = ({ month, onClick }) => {
  return (
    <header className="navbar bg-primary text-white shadow-lg">
      <button class="btn btn-square btn-ghost text-2xl">
        <IoMenu />
      </button>

      <div class="w-full flex justify-center items-center">
        <button
          className="btn btn-ghost text-2xl"
          onClick={() => onClick("prev")}
        >
          <IoChevronBack />
        </button>
        <button class="btn btn-ghost uppercase text-lg">{month}</button>
        <button
          className="btn btn-ghost text-2xl"
          onClick={() => onClick("next")}
        >
          <IoChevronForward />
        </button>
      </div>
    </header>
  );
};
