import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { fetchRequest, UserContext } from "../../../App";
import { adminAccount, adminItem, adminOrder } from "../../../classes";
import AdminOrderRow from "../../basicComponents/adminComponents/adminOrderCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";

type TParams = { accountID: string };

function AdminAccountOrders({ match, location }: RouteComponentProps<TParams>) {
  const {
    user,
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

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  let query = useQuery();
  let orderID = query.get("order");

  const getAdminUser = async () => {
    const { allowed } = await checkUserAdmin(user);

    if (allowed) {
      setAdmin(allowed);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!admin && "email" in user) {
      getAdminUser();
    } else if (admin) {
      if (Object.keys(adminItems).length === 0) {
        getItems();
      }

      if (Object.keys(adminGroupedItems).length === 0) {
        getGroupedItems();
      }

      getOrders();
    } else {
      setSearchItems([]);
      setLoading(false);
    }
  }, [match.params.accountID, admin]);

  const [searchItems, setSearchItems] = useState([] as Array<adminOrder>);
  const [weekDates, setWeekDates] = useState({
    lastSunday: "",
    nextSunday: "",
  });

  const [orders, setOrders] = useState([] as Array<adminOrder>);
  const [accountUserList, setAccountUserList] = useState(
    {} as {
      activeUsers: { [key: string]: any };
      inActiveUsers: { [key: string]: any };
    }
  );

  const [account, setAccount] = useState({
    name: "",
    accountID: 0,
    orderCount: 0,
  } as adminAccount);

  const getOrders = async () => {
    let response = await fetchRequest(
      user,
      `admin/orders/${match.params.accountID}`,
      "GET"
    );

    console.log("ORDER RES", response);

    if ("orders" in response) {
      // setAdminAccounts(response.accounts);
      console.log("ORDERS", response.orders);
      setSearchItems(response.orders);
      setOrders(response.orders);
    }

    if ("accountUsers" in response) {
      console.log("USERS", response.accountUsers);
      setAccountUserList(response.accountUsers);
    }

    if ("dates" in response) {
      setWeekDates(response.dates);
    }

    let accountID = null as null | number;
    adminAccounts.some((account, aIndex) =>
      account.accountID.toString() === match.params.accountID
        ? (accountID = aIndex)
        : null
    );

    if (accountID !== null) {
      setAccount({ ...adminAccounts[accountID] });
    }

    setLoading(false);
  };

  const getItems = async () => {
    let response = await fetchRequest(user, "items", "GET");

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

  // const handleItemAction = async (
  //   type: string,
  //   item: adminItem,
  //   index: number
  // ) => {
  //   let updateResponse = {} as any;
  //   if (type === "save") {
  //     updateResponse = await fetchRequest(
  //       user,
  //       `items/${item.itemID}`,
  //       "PUT",
  //       item
  //     );
  //   } else if (type === "delete") {
  //     updateResponse = await fetchRequest(
  //       user,
  //       `items/${item.itemID}`,
  //       "DELETE",
  //       item
  //     );
  //   }

  //   if ("itemsID" in updateResponse && updateResponse.itemsID) {
  //     if (adminItems[item.itemID]) {
  //       adminItems[item.itemID] = item;
  //       setAdminAccounts({ ...adminItems });
  //       // setSearchItems([...Object.keys(adminItems)]);
  //     }
  //   }
  // };

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      let searchTerm = e.target.value.toLowerCase();

      let newList = orders;
      if (searchTerm) {
        newList = orders.filter((account) => {
          let item = account;
          let orderID = `${item.campaignID}-${item.orderID}`;
          if (item.campaignName.toLowerCase().includes(searchTerm)) {
            return true;
          } else if (orderID.toLowerCase().includes(searchTerm)) {
            return true;
          } else if (item.shippingAddress?.toLowerCase().includes(searchTerm)) {
            return true;
          } else if (item.shippingDate.toLowerCase().includes(searchTerm)) {
            return true;
          } else if (
            new Date(item.shippingDate)
              .toDateString()
              .toLowerCase()
              .includes(searchTerm)
          ) {
            return true;
          } else if (
            item.giftee &&
            item.giftee in accountUserList.activeUsers &&
            "Name" in accountUserList.activeUsers[item.giftee] &&
            accountUserList.activeUsers[
              item.giftee
            ].Name.toLowerCase().includes(searchTerm)
          ) {
            return true;
          } else if (
            item.giftID &&
            item.giftID in adminItems &&
            (adminItems[item.giftID].name.toLowerCase().includes(searchTerm) ||
              adminItems[item.giftID].description
                .toLowerCase()
                .includes(searchTerm))
          ) {
            return true;
          } else if (item.groupedID && item.groupedID in adminGroupedItems) {
            let groupedItem = adminGroupedItems[item.groupedID];

            let found = false;

            let itemSearch = groupedItem.itemsArray.filter((itemID, iIndex) => {
              let item = adminItems[itemID];
              if (item.name.toLowerCase().includes(searchTerm)) {
                found = true;
              } else if (item.description.toLowerCase().includes(searchTerm)) {
                found = true;
              }
            });

            return found;
          }
        });
      }

      setSearchItems([...newList]);
    }
  };

  const [allowMultiple, setAllowMultiple] = useState(false);
  const [multipleSelect, setMultipleSelect] = useState([] as Array<number>);

  const handleMultipleClick = (index: number) => {
    if (multipleSelect.includes(index)) {
      multipleSelect.splice(index, 1);
    } else {
      multipleSelect.push(index);
    }

    setMultipleSelect([...multipleSelect]);
  };

  const handleRowAction = (type: string, data: any) => {
    if (type === "select") {
      handleMultipleClick(data);
    } else if (type === "orderDetails") {
      window.location.replace(
        `${window.location.origin}/#/admin/orders/${match.params.accountID}?order=${data}`
      );
    } else if (type === "orderDetailsClose") {
      window.location.replace(
        `${window.location.origin}/#/admin/orders/${match.params.accountID}`
      );
    }
  };

  const [activeOrder, setActiveOrder] = useState(null as null | number);
  useEffect(() => {
    console.log("ORDER", orderID, searchItems, accountUserList);
    if (orderID) {
      setActiveOrder(parseInt(orderID));
    } else {
      setActiveOrder(null);
    }
  }, [orderID]);

  return (
    <section className={`column center`}>
      {!loading && !admin ? <Redirect to={""} /> : null}
      <Link className={`general-button admin-button`} to={`/admin/dashboard`}>
        Back to Admin Dashboard
      </Link>
      <h1>Orders</h1>
      <div className={`column center width-90`}>
        <input
          className={`general-input`}
          placeholder={`Search for Order`}
          onKeyPress={handleSearch}
        ></input>
        {/* <Link className={`general-button admin-button`} to={`/admin/items/new`}>
          Add New Item
        </Link> */}
      </div>
      <div className={`column center`}>
        {loading ? (
          <LoadingIcon />
        ) : (
          <table className={`admin-order-table`}>
            <caption>
              {account.name ? `${account.name}'s` : ""} Orders{" "}
              {/* <button onClick={() => setAllowMultiple(!allowMultiple)}>
              {allowMultiple ? "Cancel" : "Select Multiple"}
            </button> */}
            </caption>
            {allowMultiple ? (
              <caption>Orders Selected: {multipleSelect.join(", ")}</caption>
            ) : null}

            <thead>
              {allowMultiple ? <th scope="col">Select</th> : null}
              <th scope="col">Order #</th>
              <th scope="col">Shipping Date</th>
              <th scope="col">Shipping Address</th>
              <th scope="col">Giftee</th>
              <th scope="col">Gift</th>
              <th scope="col">Campaign</th>

              <th scope="col">Actions</th>

              {/* {activeOrder !== null ? (
                <th scope="col" rowSpan={2}>
                  Details
                </th>
              ) : null} */}
            </thead>
            <tbody>
              {searchItems.map((order, oIndex) => (
                <AdminOrderRow
                  key={oIndex}
                  index={oIndex}
                  order={order}
                  giftee={accountUserList.activeUsers[order.giftee]}
                  action={handleRowAction}
                  allowMultiple={allowMultiple}
                  activeOrder={activeOrder}
                />
                // <AdminAccountCard
                //   key={aIndex}
                //   index={aIndex}
                //   account={account}
                //   action={(accountID: number) => null}
                // />
              ))}
            </tbody>
          </table>
        )}
        {searchItems.length > 0 &&
        accountUserList.activeUsers &&
        activeOrder !== null ? (
          <div className={`column center-column admin-order-card-show`}>
            <AdminOrderRow
              index={activeOrder}
              order={searchItems[activeOrder]}
              giftee={
                accountUserList.activeUsers[searchItems[activeOrder].giftee]
              }
              action={handleRowAction}
              allowMultiple={false}
              activeOrder={activeOrder}
              cardMode={true}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default AdminAccountOrders;
