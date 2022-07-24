import { Link } from "react-router-dom";
import clsx from "clsx";
export const ButtonCircle = ({
  children,
  onClick,
  target,
  active,
  date,
  time,
}) => {
  return (
    <Link
      to={date && time ? `/edit/date=${date}&time=${time}` : "/edit"}
      onClick={() => onClick(target)}
      className={clsx("button-circle", {
        active: active,
      })}
    >
      {children}
    </Link>
  );
};
