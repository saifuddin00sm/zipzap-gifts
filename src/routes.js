import * as React from "react";
import { Routes, Route } from "react-router-dom";

import App from "./App";
import Todo from "./components/Todo";

const ZipZapRoutes = () => {
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
      </Route>
    </Routes>
  );
};

export default ZipZapRoutes;
