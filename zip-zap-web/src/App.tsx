import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Route, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import appSettings from "./appSettings.json";
import HomePageComponent from "./components/homePageComponent";
import AdminDashboard from "./components/adminComponents/adminDashboard";
import AdminItemsList from "./components/adminComponents/adminItems/adminItemsList";
import {
  adminAccount,
  adminGroupedItem,
  adminItem,
  userEvent,
  userGroupedItem,
  userItem,
  userMonthOrderList,
  userRecipient,
} from "./classes";
import AdminItemNew from "./components/adminComponents/adminItems/adminItemNew";
import AdminGroupedItemsList from "./components/adminComponents/adminGroupedItems/adminGroupedItemsList";
import AdminGroupedItemNew from "./components/adminComponents/adminGroupedItems/adminGroupedItemNew";
import AdminOrders from "./components/adminComponents/adminOrders/adminOrders";
import AdminAccountOrders from "./components/adminComponents/adminOrders/adminAccountOrders";
import EventDashboard from "./components/eventComponents/eventDashboard";
import EventNew from "./components/eventComponents/eventNew";
import OrderNew from "./components/orderComponents/orderNew";
import NavBarComponent from "./components/navBarComponents/navBarComponent";
import SideBarComponent from "./components/navBarComponents/SideBarComponent";
import FooterComponent from "./components/navBarComponents/footerComponent";
import OrderPastDashboard from "./components/orderComponents/orderPastDashboard";
import UserDashboard from "./components/userComponents/userDashboard";
import giftDashboard from "./components/giftComponents/giftDashboard";
import profileDashboard from "./components/basicComponents/profileComponents/ProfileDashboard";
import AuthCallback, {
  getRefreshToken,
  newUserInfo,
} from "./components/basicComponents/accountComponents/authCallback";
import LoadingIcon from "./components/basicComponents/LoadingIcon";
import UserNewList from "./components/userComponents/userNewList";
import RegisterComponent from "./components/basicComponents/accountComponents/registerComponent";
import Logout from "./components/basicComponents/accountComponents/logout";
import CheckoutPage from "./components/stripeComponents/checkoutPage";
import AdminPayments from "./components/adminComponents/adminPayments";
import AdminDBOrders from "./components/adminComponents/adminDBOrders";
import UserAddRecipientContainer from "./components/userComponents/userAddRecipientContainer";

interface AppContext {
  user: any;
  setUser: Function;
  userFeatures: Array<string>;
  setUserFeatures: Function;

  admin: boolean;
  setAdmin: Function;

  adminItems: { [key: string]: adminItem };
  setAdminItems: Function;

  adminGroupedItems: { [key: string]: adminGroupedItem };
  setAdminGroupedItems: Function;

  adminAccounts: Array<adminAccount>;
  setAdminAccounts: Function;

  // userEvents: Array<userEvent>;
  userEvents: { [key: string]: userEvent };
  setUserEvents: Function;

  userItems: { [key: string]: userItem };
  setUserItems: Function;

  userGroupedItems: { [key: string]: userGroupedItem };
  setUserGroupedItems: Function;

  userUsers: {
    activeUsers: { [key: string]: userRecipient };
    inActiveUsers: { [key: string]: userRecipient };
  };
  setUserUsers: Function;
  userUsersLoaded: boolean;
  setUserUsersLoaded: Function;

  userMonthOrders: userMonthOrderList;
  setUserMonthOrders: Function;
}

let context: AppContext = {
  user: {},
  setUser: () => null,
  userFeatures: [],
  setUserFeatures: () => null,

  admin: false,
  setAdmin: () => null,
  adminItems: {},
  setAdminItems: () => null,

  adminGroupedItems: {},
  setAdminGroupedItems: () => null,

  adminAccounts: [],
  setAdminAccounts: () => null,

  // userEvents: [],
  userEvents: {},
  setUserEvents: () => null,

  userItems: {},
  setUserItems: () => null,

  userGroupedItems: {},
  setUserGroupedItems: () => null,

  userUsers: { activeUsers: {}, inActiveUsers: {} },
  setUserUsers: () => null,
  userUsersLoaded: false,
  setUserUsersLoaded: () => null,

  userMonthOrders: { orders: {} },
  setUserMonthOrders: () => null,
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

  if (!("id_Token" in user)) {
    user.id_Token = user.id;
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
      if ("message" in suc) {
        return { error: suc.message };
      }

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

// WILL BE REMOVED
const getBetaPasswordFromLocalStorage = () => {
  let betaPasswordLocal;
  betaPasswordLocal = localStorage.getItem("betaPassword");
  if (betaPasswordLocal) {
    betaPasswordLocal = JSON.parse(betaPasswordLocal);

    if (betaPasswordLocal && betaPasswordLocal.betaPassword) {
      return betaPasswordLocal.betaPassword;
    }

    return "";
  }

  return "";
};

const setBetaPasswordToLocalStorage = (betaPasswordValue: string) => {
  localStorage.setItem(
    "betaPassword",
    JSON.stringify({ betaPassword: betaPasswordValue })
  );

  return;
};

function App() {
  const [betaPassword, setBetaPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    // email: "kevinpsites@gmail.com",
    // id: "1",
    // firstName: "Kevin",
    // lastName: "Sites",
  } as any);
  const userRef = useRef(user);
  userRef.current = user;
  const [userFeatures, setUserFeatures] = useState([] as Array<string>);
  const [admin, setAdmin] = useState(false); // CHANGE
  const [adminItems, setAdminItems] = useState(
    {} as { [key: string]: adminItem }
  );
  const [adminGroupedItems, setAdminGroupedItems] = useState(
    {} as { [key: string]: adminGroupedItem }
  );

  const [adminAccounts, setAdminAccounts] = useState([] as Array<adminAccount>);

  const [userEvents, setUserEvents] = useState(
    {} as { [key: string]: userEvent }
  );

  const [userItems, setUserItems] = useState({} as { [key: string]: userItem });
  const [userGroupedItems, setUserGroupedItems] = useState(
    {} as { [key: string]: userGroupedItem }
  );

  const [userUsers, setUserUsers] = useState({
    activeUsers: {},
    inActiveUsers: {},
  } as {
    activeUsers: { [key: string]: userRecipient };
    inActiveUsers: { [key: string]: userRecipient };
  });
  const [userUsersLoaded, setUserUsersLoaded] = useState(false);

  const [userMonthOrders, setUserMonthOrders] = useState({
    orders: {},
  } as userMonthOrderList);

  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/callback") {
      window.location.replace(
        `${window.location.origin}/#/callback${window.location.search}`
      );
    } else if (location.pathname === "/callback/register") {
      window.location.replace(
        `${window.location.origin}/#/callback${window.location.search}&type=register`
      );
    }
  }, [location]);

  useEffect(() => {
    const loadUser = async () => {
      let localUser;
      localUser = localStorage.getItem("user");
      if (localUser) {
        localUser = JSON.parse(localUser);
        if (localUser.expiresIn) {
          let now = new Date();
          let expire = new Date(localUser.expiresIn);
          // console.log("COMPARE: ", now, expire, expire < now);
          if (expire < now) {
            console.log("EXPIRED:", now, expire);
            // logout(setAppUser);
            // localUser = null;
            // setLoading(false);

            if ("refresh" in localUser) {
              // console.log("GETTING REFRESH");
              let refreshTokens = await getRefreshToken(localUser.refresh);
              localUser = await newUserInfo(refreshTokens);

              console.log("Expired Refresh", refreshTokens, localUser);

              localStorage.setItem("user", JSON.stringify(localUser));
            } else {
              // console.log("NO REFRESH");
              localUser = {};
              localStorage.removeItem("user");
              // setUser({} as any);
            }
          }
        }
        //  else {
        //   localUser = null;
        // }
      } else {
        localUser = null;
      }
      return localUser;
    };

    const setAppUser = async () => {
      let testUser = await loadUser();
      // console.log("local user", testUser);
      setUser(testUser);
      setLoading(false);
    };

    // WILL BE REMOVED
    const setBetaPasswordForApp = async () => {
      let password = await getBetaPasswordFromLocalStorage();
      setBetaPassword(password);
    };

    if (!userRef.current || !("email" in userRef.current)) {
      setAppUser();
    } else {
      setLoading(false);
    }

    if (!betaPassword) {
      setBetaPasswordForApp();
    }
    // When betaPassword is taken out for launch, this should only run on mount, so change the dependency array on the next line to empty []
  }, [betaPassword]);

  const handleBetaChange = (e: any) => {
    if (e.key === "Enter" && tempBetaPassword === "ZipZapFlashBang") {
      setBetaPassword(tempBetaPassword);
      setBetaPasswordToLocalStorage(tempBetaPassword);
      return;
    }

    if ("target" in e) {
      setTempBetaPassword(e.target.value);
    }
  };

  const [tempBetaPassword, setTempBetaPassword] = useState("");

  return loading ? (
    <div className="App">
      <NavBarComponent />
      <LoadingIcon />
      <FooterComponent />
    </div>
  ) : !betaPassword ? (
    <div
      className="App"
      style={{
        color: `var(--primary-text-grey)`,
        background: `var(--primary-white)`,
      }}
    >
      <h2>
        Welcome to Zip Zap, we are not quite ready for you, please check back
        soon!
      </h2>
      <br></br>
      <img
        src={`media/images/coming_soon.jpeg`}
        className={`item-card-image-main`}
        alt={`Coming Soon Image`}
      ></img>
      <hr></hr>
      <div>
        <label>
          If you have the super secret beta password enter it now to preview the
          website
        </label>
        <br></br>
        <br></br>
        <input
          type="password"
          value={tempBetaPassword}
          onChange={handleBetaChange}
          onKeyPress={handleBetaChange}
        ></input>
        <br></br>
        <button
          className="general-button back-link"
          onClick={() => handleBetaChange({ key: "Enter" })}
        >
          Submit
        </button>
      </div>
    </div>
  ) : (
    <Container fluid={true} className="min-vh-100 App">
      <UserContext.Provider
        value={{
          user: userRef.current,
          setUser,
          userFeatures,
          setUserFeatures,
          admin,
          setAdmin,
          adminItems,
          setAdminItems,
          adminGroupedItems,
          setAdminGroupedItems,
          adminAccounts,
          setAdminAccounts,
          userEvents,
          setUserEvents,
          userItems,
          setUserItems,
          userGroupedItems,
          setUserGroupedItems,
          userUsers,
          setUserUsers,
          userUsersLoaded,
          setUserUsersLoaded,
          userMonthOrders,
          setUserMonthOrders,
        }}
      >
        {/* TO-DO - HANDLE ERRORS */}
        <Row>
          <NavBarComponent />
        </Row>
        <Route exact path="/callback" component={AuthCallback} />
        <Route exact path="/register" component={RegisterComponent} />
        <Route exact path="/logout" component={Logout} />

        {!user || !("email" in user) || !user.email ? (
          <Route exact path="/" component={HomePageComponent} />
        ) : (
          <Row className="main-section-row">
            <Col xs="2" className="side-bar-container">
              <SideBarComponent />
            </Col>

            {/* Main Page  */}
            <Route exact path="/" component={EventDashboard} />

            {/* Stripe Pages  */}
            <Route exact path="/checkout" component={CheckoutPage} />

            {/* Event Pages  */}
            <Route exact path="/event" component={EventDashboard} />
            <Route exact path="/event/new" component={EventNew} />
            <Route exact path="/event/e/:eventID" component={EventNew} />

            {/* User Pages  */}
            <Route exact path="/recipients" component={UserDashboard} />
            <Route
              exact
              path="/recipients/add"
              component={UserAddRecipientContainer}
            />
            <Route exact path="/recipients/upload" component={UserNewList} />

            {/* Order Pages */}
            <Route exact path="/order/new" component={OrderNew} />
            <Route exact path="/order/past" component={OrderPastDashboard} />
            <Route exact path="/order/:eventID/:orderID" component={OrderNew} />

            {/* Gift Pages */}
            <Route exact path="/gifts" component={giftDashboard} />

            {/* Gift Pages */}
            <Route exact path="/profile" component={profileDashboard} />

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
            <Route
              exact
              path="/admin/chargePayments"
              component={AdminPayments}
            />
            <Route exact path="/admin/dbOrders" component={AdminDBOrders} />
          </Row>
        )}
        <Row>
          <FooterComponent />
        </Row>
      </UserContext.Provider>
    </Container>
  );
}

export { UserContext, log, fetchRequest };

export default App;
