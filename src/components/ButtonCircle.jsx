import { Link } from "react-router-dom";
import clsx from "clsx";
export const ButtonCircle = ({ children, onClick, active, className }) => {
  return (
    <Link
      to="/edit"
      onClick={onClick}
      className={clsx("btn btn-circle", className, {
        active: active,
      })}
    >
      {children}
    </Link>
  );
};
