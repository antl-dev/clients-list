import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Calendar } from "./Page/Calendar";
import { Edit } from "./Page/Edit";
import { Test } from "./Page/Test";

const queryClient = new QueryClient();

export const App = () => {
  const [globalState, setGlobalState] = useState(123);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={`/edit`} element={<Edit data={globalState} />} />
          <Route path={`/test`} element={<Test />} />
          <Route index element={<Calendar handle={setGlobalState} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
