import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import App from "./App";
import Todo from "./components/Todo";
import RecipientList from "./components/Recipients/RecipientList";

const ZipZapRoutes = () => {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <main style={{ padding: "1rem" }}>
              <p>TODO: Put Dashboard Here</p>
            </main>
          }
        />
        <Route path="todo" element={<Todo />} />
        <Route path="recipients" element={<RecipientList />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>No content for {pathname} at this time</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default ZipZapRoutes;
