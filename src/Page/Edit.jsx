import { Link, useParams } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

export const Edit = () => {
  const params = useParams();
  console.log(params);
  return (
    <section className="flex-center-center flex-col gap-3 bg-slate-200 w-screen h-screen">
      <Link
        to="/"
        className="text-3xl text-gray-600 bg-white p-2 rounded-full shadow-md shadow-orange-400"
      >
        <IoCloseOutline />
      </Link>
      <div className="bg-white w-11/12 h-5/6 p-2 rounded-md shadow-lg shadow-orange-400">
        {params.date}
      </div>
    </section>
  );
};
