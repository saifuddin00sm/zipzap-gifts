import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import GiftDashboard from "./components/GiftDashboard/GiftDashboard";
import ProfilePage from "./components/Profile/ProfilePage";
import Orders from "./components/Orders/Orders";

import App from "./App";
import Todo from "./components/Todo";
import RecipientList from "./components/Recipients/RecipientList";
import SendAGift from "./components/SendAGift/SendAGift";
import GiftCatalog from "./components/GiftCatalog/GiftCatalog";
import UploadGift from "./components/Admin/UploadGift";
import ImportRecipients from "./components/Recipients/ImportRecipients";
import RecipientProfile from "./components/Recipients/RecipientProfile/RecipientProfile";

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
        <Route path="gifts" element={<SendAGift />} />
        <Route path="admin" element={<UploadGift />} />
        <Route path="recipients/upload" element={<ImportRecipients />} />
        <Route path="recipients/:id" element={<RecipientProfile />} />
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
