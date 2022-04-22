import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import GiftDashboard from "./components/GiftDashboard/GiftDashboard";
import ProfilePage from "./components/Profile/ProfilePage";
import Orders from "./components/Orders/Orders";

import App from "./App";
import Todo from "./components/Todo";
import RecipientList from "./components/Recipients/RecipientList";

import GiftCatalog from "./components/GiftCatalog/GiftCatalog";

const ZipZapRoutes = () => {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<GiftDashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="todo" element={<Todo />} />
        <Route path="recipients" element={<RecipientList />} />
        <Route path="catalog" element={<GiftCatalog />} />
        <Route path="orders" element={<Orders />} />
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
