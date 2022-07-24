import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Edit } from "./Page/Edit";
import { List } from "./Page/List";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/edit`} element={<Edit />}>
          <Route path={`/date=:date&time=:time`} element={<Edit />} />
          <Route index element={<Edit />} />
        </Route>
        <Route index element={<List />} />
      </Routes>
    </BrowserRouter>
  );
};
