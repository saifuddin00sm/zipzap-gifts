import React, { useState } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import appSettings from "./appSettings.json";
import HomePageComponent from "./components/homePageComponent";
import AdminDashboard from "./components/adminComponents/adminDashboard";
import AdminItemsList from "./components/adminComponents/adminItems/adminItemsList";
import { adminAccount, adminGroupedItem, adminItem } from "./classes";
import AdminItemNew from "./components/adminComponents/adminItems/adminItemNew";
import AdminGroupedItemsList from "./components/adminComponents/adminGroupedItems/adminGroupedItemsList";
import AdminGroupedItemNew from "./components/adminComponents/adminGroupedItems/adminGroupedItemNew";
import AdminOrders from "./components/adminComponents/adminOrders/adminOrders";
import AdminAccountOrders from "./components/adminComponents/adminOrders/adminAccountOrders";

interface AppContext {
  user: any;
  setUser: Function;
  admin: boolean;
  setAdmin: Function;
  adminItems: { [key: string]: adminItem };
  setAdminItems: Function;

  adminGroupedItems: { [key: string]: adminGroupedItem };
  setAdminGroupedItems: Function;

  adminAccounts: Array<adminAccount>;
  setAdminAccounts: Function;
}

let context: AppContext = {
  user: {},
  setUser: () => null,
  admin: false,
  setAdmin: () => null,
  adminItems: {},
  setAdminItems: () => null,

  adminGroupedItems: {},
  setAdminGroupedItems: () => null,

  adminAccounts: [],
  setAdminAccounts: () => null,
};

const UserContext = React.createContext(context);

const log = (...other: any) => {
  if (appSettings.debug) {
    console.log(other);
  }
};

const fetchRequest = async (
  user: any,
  endpoint: string,
  method?: string,
  body?: any,
  bodyType?: string,
  customHeader?: any
) => {
  if (!user || !("email" in user)) {
    return { error: "Expired User" };
  }

  return await fetch(
    `${appSettings.backendServer}/${endpoint}`,
    customHeader !== undefined
      ? customHeader
      : method === "GET" || method === "DELETE"
      ? {
          method: method,
          headers: {
            user: user.email,
            "user-token": user.id_Token,
            "Content-Type": "application/json",
            "presentation-date": "",
          },
        }
      : bodyType && bodyType === `File`
      ? {
          method: method ? method : "POST",
          headers: {
            user: user.email,
            "user-token": user.id_Token,
            "Content-Type": "application/json",
          },
          body: body,
        }
      : {
          method: method ? method : "POST",
          headers: {
            user: user.email,
            "user-token": user.id_Token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
  )
    .then((res) => {
      return res.json();
    })
    .then((suc) => {
      console.log("RES JSON: ", suc);
      // return suc.body;
      if ("body" in suc) {
        return suc.body;
      }
      return suc;
    })
    .catch((err) => {
      log(`${endpoint} Error: ${err}`);
      // "We're having technical difficulties, please try again later."
      return {
        error: String(err).includes(`Failed to fetch`)
          ? `We're having technical difficulties, please try again later.`
          : String(err),
        data: false,
      };
    });
};

function App() {
  const [user, setUser] = useState({ email: "kevinpsites@gmail.com" } as any);
  const [admin, setAdmin] = useState(true); // CHANGE
  const [adminItems, setAdminItems] = useState(
    {} as { [key: string]: adminItem }
  );
  const [adminGroupedItems, setAdminGroupedItems] = useState(
    {} as { [key: string]: adminGroupedItem }
  );

  const [adminAccounts, setAdminAccounts] = useState([] as Array<adminAccount>);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
          admin: admin,
          setAdmin: setAdmin,
          adminItems: adminItems,
          setAdminItems: setAdminItems,
          adminGroupedItems: adminGroupedItems,
          setAdminGroupedItems: setAdminGroupedItems,
          adminAccounts: adminAccounts,
          setAdminAccounts: setAdminAccounts,
        }}
      >
        <Route exact path="/" component={HomePageComponent} />

        {/* ADMIN PAGES */}
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/items" component={AdminItemsList} />
        <Route exact path="/admin/items/new" component={AdminItemNew} />
        <Route
          exact
          path="/admin/groupedItems"
          component={AdminGroupedItemsList}
        />
        <Route
          exact
          path="/admin/groupedItems/new"
          component={AdminGroupedItemNew}
        />

        <Route exact path="/admin/orders" component={AdminOrders} />
        <Route
          exact
          path="/admin/orders/:accountID"
          component={AdminAccountOrders}
        />
      </UserContext.Provider>
    </div>
  );
}

export { UserContext, log, fetchRequest };

export default App;
