import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import GiftDashboard from "./components/GiftDashboard/GiftDashboard";
import ProfilePage from "./components/Profile/ProfilePage";

import App from "./App";
import Todo from "./components/Todo";

const ZipZapRoutes = (props) => {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<GiftDashboard />} />
        <Route path="profile" element={<ProfilePage user={props.user} />} />

        <Route path="todo" element={<Todo />} />
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
