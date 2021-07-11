import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../../App";
import { adminAccount, adminItem } from "../../../classes";
import AdminAccountCard from "../../basicComponents/adminComponents/adminAccountCard";
import AdminItemCard from "../../basicComponents/adminComponents/adminItemCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";

function AdminOrders() {
  const {
    user,
    setUserFeatures,
    admin,
    setAdmin,
    adminAccounts,
    setAdminAccounts,
    adminItems,
    setAdminItems,
    adminGroupedItems,
    setAdminGroupedItems,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getAdminUser = async () => {
    const { allowed, userFeatures } = await checkUserAdmin(user);

    if (allowed) {
      setAdmin(allowed);
    }

    if (userFeatures.length > 0) {
      setUserFeatures(userFeatures);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!admin && "email" in user) {
      getAdminUser();
    } else if (admin) {
      console.log(
        "ST",
        admin,
        Object.keys(adminItems).length,
        Object.keys(adminGroupedItems).length,
        adminAccounts.length
      );
      if (Object.keys(adminItems).length === 0) {
        getItems();
      }

      if (Object.keys(adminGroupedItems).length === 0) {
        getGroupedItems();
      }

      if (adminAccounts.length === 0) {
        getOrders();
      } else {
        setSearchItems(adminAccounts);
        setLoading(false);
      }
    } else {
      setSearchItems(adminAccounts);
      setLoading(false);
    }
  }, []);

  const [searchItems, setSearchItems] = useState([] as Array<adminAccount>);
  const [weekDates, setWeekDates] = useState({
    lastSunday: "",
    nextSunday: "",
  });
  const getOrders = async () => {
    let response = await fetchRequest(user, "admin/orders", "GET");

    if ("accounts" in response) {
      setAdminAccounts(response.accounts);
      setSearchItems(response.accounts);
    }

    if ("dates" in response) {
      setWeekDates(response.dates);
    }

    setLoading(false);
  };

  const getItems = async () => {
    let response = await fetchRequest(user, "items?admin=true", "GET");

    if ("items" in response) {
      setAdminItems(response.items);
      // setSearchItems(response.items);
    }

    // setLoading(false);
  };

  const getGroupedItems = async () => {
    let response = await fetchRequest(user, "groupedItems", "GET");

    if ("items" in response) {
      setAdminGroupedItems(response.items);
    }

    // setLoading(false);
  };

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      let searchTerm = e.target.value.toLowerCase();

      let newList = adminAccounts;
      if (searchTerm) {
        newList = adminAccounts.filter((account) => {
          let item = account;
          if (item.name.toLowerCase().includes(searchTerm)) {
            return true;
          } else if (searchTerm.includes(item.orderCount)) {
            return true;
          }
        });
      }

      setSearchItems([...newList]);
    }
  };

  const [redirect, setRedirect] = useState("");

  return (
    <section className={`column center`}>
      {!loading && !admin ? <Redirect to={""} /> : null}
      {redirect ? <Redirect to={redirect} /> : null}

      <Link className={`general-button admin-button`} to={`/admin/dashboard`}>
        Back to Admin Dashboard
      </Link>

      <h1>Orders</h1>
      <h4>
        Accounts with orders for this week{" "}
        {weekDates.lastSunday
          ? `(${weekDates.lastSunday} -
        ${weekDates.nextSunday})`
          : null}
      </h4>

      <div className={`column center width-90`}>
        <input
          className={`general-input`}
          placeholder={`Search for Account`}
          onKeyPress={handleSearch}
        ></input>

        {/* <Link className={`general-button admin-button`} to={`/admin/items/new`}>
          Add New Item
        </Link> */}
      </div>

      {loading ? (
        <LoadingIcon />
      ) : (
        searchItems.map((account, aIndex) => (
          <AdminAccountCard
            key={aIndex}
            index={aIndex}
            account={account}
            action={(accountID: number) =>
              setRedirect(`/admin/orders/${accountID}`)
            }
          />
          // <AdminItemCard
          //   key={iIndex}
          //   index={iIndex}
          //   item={adminItems[item]}
          //   action={handleItemAction}
          // />
        ))
      )}
    </section>
  );
}

export default AdminOrders;
