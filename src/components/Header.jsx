import { IoChevronBack, IoChevronForward } from "react-icons/io5";
export const Header = ({ month, onClick, className }) => {
  return (
    <header className={`header ${className}`}>
      <button onClick={() => onClick("prev")}>
        <IoChevronBack />
      </button>
      <p>{month}</p>
      <button onClick={() => onClick("next")}>
        <IoChevronForward />
      </button>
    </header>
  );
};
