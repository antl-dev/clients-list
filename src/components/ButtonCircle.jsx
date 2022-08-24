import { Link } from "react-router-dom";
import clsx from "clsx";
export const ButtonCircle = ({ children, onClick, active, className }) => {
  return (
    <Link
      to="/edit"
      onClick={onClick}
      className={clsx("btn btn-circle btn-primary", className, {
        "btn-accent": active,
      })}
    >
      {children}
    </Link>
  );
};
