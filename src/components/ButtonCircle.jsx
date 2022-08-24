import clsx from "clsx";
export const ButtonCircle = ({ children, onClick, active, className }) => {
  return (
    <button
      onClick={onClick}
      className={clsx("btn btn-circle btn-primary", className, {
        "btn-accent": active,
      })}
    >
      {children}
    </button>
  );
};
