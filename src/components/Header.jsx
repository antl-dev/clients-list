import { IoChevronBack, IoChevronForward, IoMenu } from "react-icons/io5";
export const Header = ({ month, onClick }) => {
  return (
    <header className="navbar bg-primary text-white shadow-lg">
      <div className="navbar-start">
        <button className="btn btn-square btn-ghost text-xl">
          <IoMenu />
        </button>
      </div>

      <div className="navbar-center">
        <button className="btn btn-ghost uppercase text-lg">{month}</button>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost text-xl"
          onClick={() => onClick("prev")}
        >
          <IoChevronBack />
        </button>
        <button
          className="btn btn-ghost text-xl"
          onClick={() => onClick("next")}
        >
          <IoChevronForward />
        </button>
      </div>
    </header>
  );
};
